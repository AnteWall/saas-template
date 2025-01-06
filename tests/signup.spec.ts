import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Signup", () => {
  test("Can signup trough email and then redirects", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/signin/);

    await page.goto("/signup");

    await page.getByLabel("Name").fill("Test Testsson");
    await page.getByLabel("Email").fill("testsson@test.com");
    await page.getByLabel("Password", { exact: true }).fill("password12345");
    await page
      .getByLabel("Confirm password", { exact: true })
      .fill("password12345");

    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page).toHaveURL("/");
  });
});
