import React from "react";
import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  Loader,
  Progress,
} from "@mantine/core";
import { useListOrganizations } from "../../../hooks/auth/useListOrganizations";
import { IconCheck } from "@tabler/icons-react";
import { toInitials } from "../../../utils/string";
import { useSession } from "../../../hooks/auth/useSession";
import { Link } from "react-router";
import { paths } from "@/pages/paths";
import { useAuth } from "@/hooks/auth/useAuth";

export const UserButton: React.FC = () => {
  const { logout } = useAuth();

  const { data, isPending } = useSession();

  const { data: organizations, isPending: organizationsPending } =
    useListOrganizations();

  const organizationLinks = organizations?.map((org) => {
    const isActive = org.id === data?.data?.session.activeOrganizationId;
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
          <Avatar radius="sm" src={data?.data?.user.image}>
            {isPending ? (
              <Loader size="xs" />
            ) : (
              toInitials(data?.data?.user.name)
            )}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Text fz="sm" fw="bold">
              {data?.data?.user.name}
            </Text>
            <Text fz="sm" c="dimmed">
              {data?.data?.user.email}
            </Text>
          </Menu.Item>
          <Menu.Divider />
          {organizationsPending && (
            <Menu.Item>
              <Progress value={100} animated />
            </Menu.Item>
          )}

          {organizationLinks}
          <Menu.Divider />
          <Menu.Item>Invite & manage members</Menu.Item>

          <Link to={paths.Settings}>
            <Menu.Item>Settings</Menu.Item>
          </Link>
          <Menu.Divider />
          <Menu.Item
            onClick={() =>
              logout({
                onSuccess: () => {},
              })
            }
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
};
