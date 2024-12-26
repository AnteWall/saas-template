import {
  Group,
  Anchor,
  Stack,
  TextInput,
  Text,
  PasswordInput,
  Button,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { AuthLayoutWrapper } from "../../components/layout/AuthLayoutWrapper";
import { signIn } from "../../hooks/auth/auth";
import classes from "./SignIn.module.css";
import { UseSessionKey } from "@/hooks/auth/useSession";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import React from "react";

export const SignIn: React.FC = () => {
  const queryClient = useQueryClient();

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
    <>
      <HelmetWrapper title="Sign in" />
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
        <form
          onSubmit={form.onSubmit(
            (values) =>
              void signIn.email(values, {
                onSuccess: () => {
                  void queryClient.invalidateQueries({
                    queryKey: [UseSessionKey],
                  });
                },
              })
          )}
        >
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
    </>
  );
};
