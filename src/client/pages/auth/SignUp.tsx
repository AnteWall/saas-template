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
import { useState } from "react";
import classes from "./SignIn.module.css";
import { Link } from "react-router";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { useAuth } from "@/hooks/auth/useAuth";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
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
    const res = await signUp<"email">({
      provider: "email",
      name: values.name,
      email: values.email,
      password: values.password,
    });
    if ("error" in res) {
      setError(res?.error?.message);
    }
  };

  return (
    <>
      <HelmetWrapper title="Sign up" />
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
              classNames={{ input: classes.textInput }}
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              classNames={{ input: classes.textInput }}
              placeholder="Your email address"
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
export default SignUp;
