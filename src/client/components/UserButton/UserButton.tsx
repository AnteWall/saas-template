import React from "react";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useListOrganizations, useSession } from "../../hooks/auth";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { toInitials } from "../../utils/string";

export interface UserButtonProps {}

export const UserButton: React.FC<UserButtonProps> = ({}) => {
  const { data, isPending } = useSession();

  const { data: organizations, isPending: organizationsPending } =
    useListOrganizations();

  const organizationLinks = organizations?.map((org) => {
    const isActive = org.id === data?.session.activeOrganizationId;
    return (
      <Menu.Item key={org.id}>
        <Group gap={8}>
          <Avatar size="sm" radius="sm" src={org.logo}>
            {toInitials(org.name)}
          </Avatar>
          <Text fz="sm" flex="auto" ta="left" lineClamp={1} maw={200}>
            {org.name}
          </Text>
          {isActive && <IconCheck size={16} />}
        </Group>
      </Menu.Item>
    );
  });

  return (
    <UnstyledButton>
      <Menu position="right-end">
        <Menu.Target>
          <Avatar radius="sm" src={data?.user.image}>
            {toInitials(data?.user.name)}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Text fz="sm" fw="bold">
              {data?.user.name}
            </Text>
            <Text fz="sm" c="dimmed">
              {data?.user.email}
            </Text>
          </Menu.Item>
          <Menu.Divider />
          {organizationLinks}
          <Menu.Divider />
          <Menu.Item>Invite & manage members</Menu.Item>

          <Link to="/settings">
            <Menu.Item>Settings</Menu.Item>
          </Link>
          <Menu.Divider />
          <Menu.Item>Sign out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
};
