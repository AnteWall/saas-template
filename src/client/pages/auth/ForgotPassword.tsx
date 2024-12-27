import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { AuthLayoutWrapper } from "@/components/layout/AuthLayoutWrapper";
import {
  Anchor,
  Text,
  Button,
  Group,
  Stack,
  TextInput,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./ForgotPassword.module.css";
import { Link } from "react-router";
import { useForgotPasswordMutation } from "@/hooks/auth/useForgotPasswordMutation";
import { IconInfoCircle } from "@tabler/icons-react";

export const ForgotPassword: React.FC = () => {
  const { mutate, error, isSuccess, isPending } = useForgotPasswordMutation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <AuthLayoutWrapper
      title="Forgot password"
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
      <>
        <HelmetWrapper title="Forgot password" />
        <form onSubmit={form.onSubmit((values) => mutate(values.email))}>
          <Stack>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Your email address"
              classNames={{ input: classes.textInput }}
              key={form.key("email")}
              {...form.getInputProps("email")}
              error={error?.message}
            />

            <Button
              disabled={isSuccess}
              loading={isPending}
              size="lg"
              type="submit"
              fullWidth
              radius="lg"
            >
              Reset password
            </Button>
            {isSuccess && (
              <Alert
                variant="light"
                radius="lg"
                color="blue"
                icon={<IconInfoCircle />}
              >
                If the email is registered, you will receive a password reset
                link shortly.
                <br /> If you don't receive an email, please check your spam
                folder.
              </Alert>
            )}
          </Stack>
        </form>
      </>
    </AuthLayoutWrapper>
  );
};
