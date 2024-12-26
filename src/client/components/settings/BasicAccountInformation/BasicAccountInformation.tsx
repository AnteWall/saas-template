import React, { useEffect, useState } from "react";
import {
  Paper,
  Group,
  Avatar,
  TextInput,
  Button,
  Divider,
  Grid,
  Text,
  Stack,
} from "@mantine/core";
import { changeEmail, updateUser } from "../../../hooks/auth/auth";
import { useForm } from "@mantine/form";
import { toInitials } from "../../../utils/string";
import { useSession } from "../../../hooks/auth/useSession";

export const BasicAccountInformation: React.FC = () => {
  const { data } = useSession();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: data?.data?.user.name ?? "",
      email: data?.data?.user.email ?? "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.setFieldValue("name", data.data.user.name);
      form.setFieldValue("email", data.data.user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    setLoading(true);
    let res = await updateUser({
      name,
    });
    if (res.error) {
      setError(res.error.message);
      setLoading(false);
      return;
    }
    if (email != data?.data?.user.email) {
      res = await changeEmail({ newEmail: email });
    }
    setError(res.error?.message);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((v) => void handleSubmit(v))}>
        <Paper>
          <Grid px="lg" py="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group align="center" justify="center" h="100%">
                <Avatar
                  mt="md"
                  size="lg"
                  radius="xl"
                  src={data?.data?.user.image}
                  mx="xl"
                >
                  {toInitials(data?.data?.user.name)}
                </Avatar>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput
                label="Name"
                placeholder="Your name"
                required
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
          </Grid>
          <Divider mt="md" />
          <Grid p="lg">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Email"
                placeholder="Your email address"
                required
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </Grid.Col>
          </Grid>
        </Paper>
        <Group mt="md" justify="flex-start">
          <Stack gap={4}>
            {error && <Text c="red">{error}</Text>}
            <Button disabled={!form.isDirty()} loading={loading} type="submit">
              Save changes
            </Button>
          </Stack>
        </Group>
      </form>
    </>
  );
};
