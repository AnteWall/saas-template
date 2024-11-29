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
import classes from "./signin.module.css";
import { signIn } from "../../hooks/auth";

const SignIn: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <AuthLayoutWrapper
      title="Welcome back"
      subTitle={
        <Group gap={4} justify="center">
          <Text c="dimmed" fz="sm">
            First time here?
          </Text>
          <Anchor fz="sm" component={Link} to="/signup">
            Sign up for free.
          </Anchor>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit((values) => signIn.email(values))}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Your email address"
            classNames={{ input: classes.textInput }}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            classNames={{ input: classes.textInput }}
            placeholder="Your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button size="lg" type="submit" fullWidth radius="lg">
            Sign in
          </Button>
          <Divider label="or" />
          <Button
            leftSection={<IconBrandGoogleFilled />}
            variant="outline"
            size="lg"
            radius="lg"
          >
            Sign in with Google
          </Button>
        </Stack>
      </form>
    </AuthLayoutWrapper>
  );
};

export const Route = createFileRoute("/(auth)/signin")({
  component: SignIn,
  beforeLoad: ({ context, location }) => {
    if (!context.authPending && context.auth?.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});
