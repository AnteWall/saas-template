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
import { changeEmail, updateUser, useSession } from "../../../hooks/auth";
import { useForm } from "@mantine/form";
import { toInitials } from "../../../utils/string";

export interface BasicAccountInformationProps {}

export const BasicAccountInformation: React.FC<
  BasicAccountInformationProps
> = ({}) => {
  const { data } = useSession();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: data?.user.name || "",
      email: data?.user.email || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue("name", data.user.name);
      form.setFieldValue("email", data.user.email);
    }
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
    if (res?.error) {
      setError(res?.error?.message);
      setLoading(false);
      return;
    }
    if (email != data?.user.email) {
      res = await changeEmail({ newEmail: email });
    }
    setError(res?.error?.message);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper>
          <Grid px="lg" py="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group align="center" justify="center" h="100%">
                <Avatar
                  mt="md"
                  size="lg"
                  radius="xl"
                  src={data?.user.image}
                  mx="xl"
                >
                  {toInitials(data?.user.name)}
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
          <Divider color="dark.5" mt="md" />
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
