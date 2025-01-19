import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres:postgres@localhost:5433/test",
});

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

const signUpAsTestUser = async (
  page,
  {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  },
) => {
  await page.goto("/");
  await expect(page).toHaveURL(/signin/);
  await page.goto("/signup");
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign up" }).click();
};

const signInAsUser = async (
  page,
  { email, password }: { email: string; password: string },
) => {
  await expect(page).toHaveURL(/signin/);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login", exact: true }).click();
};

const signOut = async (page) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.getByTestId("nav-user").click();
  await page.getByTestId("logout-btn").click();
};

test.describe("Signup", () => {
  test("Can signup trough email and then redirects", async ({ page }) => {
    await signUpAsTestUser(page, {
      name: "Test Testsson",
      email: "test@testsson.com",
      password: "password12345",
    });
    await expect(page).toHaveURL("/");
  });

  test("Can logout and then redirects", async ({ page }) => {
    await signUpAsTestUser(page, {
      name: "Test Testsson",
      email: "testlogout@testsson.com",
      password: "password12345",
    });
    await expect(page).toHaveURL("/");

    await page.getByTestId("nav-user").click();

    await page.getByTestId("logout-btn").click();
    await expect(page).toHaveURL(/signin/);
  });

  test("Can signup and then reset password", async ({ page }) => {
    const email = "testreset@testsson.com";

    await signUpAsTestUser(page, {
      name: "Test Testsson",
      email: email,
      password: "password12345",
    });

    await expect(page).toHaveURL("/");

    await signOut(page);

    await expect(page).toHaveURL(/signin/);

    await page.getByRole("link", { name: "Forgot your password?" }).click();

    await page.getByLabel("Email").fill(email);

    await page.getByRole("button", { name: "Reset password" }).click();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const verification = await prisma.verification.findFirst({
      where: {
        value: user.id,
      },
    });

    if (!verification) {
      throw new Error("Verification not found");
    }

    const token = verification.identifier.split(":")[1];

    await page.goto(
      `/api/auth/reset-password/${token}?callbackURL=/reset-password`,
    );

    await expect(page).toHaveURL(`/reset-password?token=${token}`);

    await page.getByLabel("New password").fill("123456789");

    await page.getByRole("button", { name: "Reset password" }).click();

    await expect(page).toHaveURL("/signin");

    await signInAsUser(page, {
      email,
      password: "123456789",
    });

    await expect(page).toHaveURL("/");

    expect(await page.getByTestId("nav-user").textContent()).toContain(
      "Test Testsson",
    );
  });
});
