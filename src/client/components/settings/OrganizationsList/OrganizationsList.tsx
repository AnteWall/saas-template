import React, { useMemo } from "react";
import classes from "./OrganizationsList.module.css";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "mantine-datatable";
import { useListOrganizations } from "@/hooks/auth/useListOrganizations";
import {
  ActionIcon,
  Text,
  Box,
  Stack,
  Avatar,
  Group,
  Skeleton,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { trpc } from "@/hooks/trpc";
import { useNavigate } from "react-router";
import { paths } from "@/pages/paths";

interface Organization {
  id: string;
  createdAt: Date;
  name: string;
  slug?: string | null;
  metadata?: unknown;
  logo?: string | null | undefined;
}

const OrganizationStats: React.FC<{
  orgnaizationName: string;
  organizationId: string;
  logo?: string | null;
}> = ({ logo, organizationId, orgnaizationName }) => {
  const { data, isPending } = trpc.getOrganizationMembers.useQuery({
    organizationId,
  });

  return (
    <Box py="xs">
      <Group>
        <Avatar src={logo} size="32" radius="sm" />
        <Stack gap={4}>
          <Text size="sm" fw="bold">
            {orgnaizationName}
          </Text>
          <Skeleton h={17} visible={isPending}>
            <Text size="xs" c="dimmed">
              {data?.members.length ?? "-"} members
            </Text>
          </Skeleton>
        </Stack>
      </Group>
    </Box>
  );
};

export const OrganizationsList: React.FC = () => {
  const { data, isPending, error } = useListOrganizations();
  const navigate = useNavigate();

  const columns = useMemo(
    () =>
      [
        {
          accessor: "name",
          title: "Name",
          render: (row) => (
            <OrganizationStats
              orgnaizationName={row.name}
              logo={row.logo}
              organizationId={row.id}
            />
          ),
        },
        {
          textAlign: "right",
          accessor: "id",
          render: () => (
            <ActionIcon variant="subtle">
              <IconDots size={16} />
            </ActionIcon>
          ),
        },
      ] as DataTableColumn<Organization>[],
    []
  );

  const onRowClick = (record: Organization) => {
    console.log("record", record);
    void navigate(
      paths.SettingsOrganization({
        id: record.id,
      })
    );
  };

  return (
    <div className={classes.root}>
      <DataTable
        onRowClick={({ record }) => {
          onRowClick(record);
        }}
        fetching={isPending}
        error={error}
        noHeader
        columns={columns}
        records={data ?? []}
      />
    </div>
  );
};
