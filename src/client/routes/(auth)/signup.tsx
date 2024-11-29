import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AuthLayoutWrapper } from "../../components/layout/AuthLayoutWrapper";
import {
  Anchor,
  Text,
  Group,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { signUp } from "../../hooks/auth";
import { useState } from "react";
import classes from "./signup.module.css";

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length > 0 ? null : "Name is required"),
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setError(res?.error?.message);
  };

  return (
    <AuthLayoutWrapper
      title="Sign up for free"
      subTitle={
        <Group gap={4} justify="center">
          <Text c="dimmed" fz="sm">
            Already have an account?
          </Text>
          <Anchor fz="sm" component={Link} to="/signin">
            Sign in.
          </Anchor>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            className={classes.textInput}
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            className={classes.textInput}
            placeholder="Your email address"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            className={classes.textInput}
            placeholder="Your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button size="lg" type="submit" fullWidth>
            Sign up
          </Button>
          {error && (
            <Text fz="sm" c="red">
              {error}
            </Text>
          )}
          <Divider label="or" />
          <Button
            leftSection={<IconBrandGoogleFilled />}
            variant="outline"
            size="lg"
          >
            Sign in with Google
          </Button>
        </Stack>
      </form>
    </AuthLayoutWrapper>
  );
};

export const Route = createFileRoute("/(auth)/signup")({
  component: SignIn,
  beforeLoad: ({ context, location }) => {
    if (!context.authPending && context.auth?.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});
