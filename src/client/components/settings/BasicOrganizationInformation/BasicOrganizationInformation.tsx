import React from "react";
import {
  Paper,
  Group,
  Avatar,
  TextInput,
  Button,
  Grid,
  Text,
  Stack,
} from "@mantine/core";
import { Organization } from "../../../hooks/auth/auth";
import { useForm } from "@mantine/form";
import { toInitials } from "../../../utils/string";
import { useUpdateOrganizationMutation } from "@/hooks/auth/useUpdateOrganizationMutation";

interface BasicOrganizationInformationProps {
  organization: Organization;
}

export const BasicOrganizationInformation: React.FC<
  BasicOrganizationInformationProps
> = ({ organization }) => {
  const { error, isPending, mutate } = useUpdateOrganizationMutation();

  const form = useForm({
    initialValues: {
      name: organization.name,
      slug: organization.slug,
    },
  });

  const handleSubmit = ({ name, slug }: { slug: string; name: string }) => {
    mutate({ name, slug });
  };

  return (
    <>
      <form onSubmit={form.onSubmit((v) => void handleSubmit(v))}>
        <Paper>
          <Grid px="lg" py="md" pb="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group align="center" justify="center" h="100%">
                <Avatar
                  mt="md"
                  size="lg"
                  radius="xl"
                  src={organization.logo}
                  mx="xl"
                >
                  {toInitials(organization.name)}
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
        </Paper>
        <Group mt="md" justify="flex-start">
          <Stack gap={4}>
            {error && <Text c="red">{error.message}</Text>}
            <Button
              disabled={!form.isDirty()}
              loading={isPending}
              type="submit"
            >
              Save changes
            </Button>
          </Stack>
        </Group>
      </form>
    </>
  );
};
