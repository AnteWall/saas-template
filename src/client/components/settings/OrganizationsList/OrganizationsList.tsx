import React, { useMemo } from "react";
import classes from "./OrganizationsList.module.css";
import { DataTable } from "@/components/common/DataTable";
import { DataTableColumn } from "mantine-datatable";
import { useListOrganizations } from "@/hooks/auth/useListOrganizations";
import { ActionIcon, Text, Box, Avatar, Group } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { trpc } from "@/hooks/trpc";

type Organization = {
  id: string;
  createdAt: Date;
  name: string;
  slug: string;
  metadata?: any;
  logo?: string | null | undefined;
};

export interface OrganizationsListProps {}

export const OrganizationsList: React.FC<OrganizationsListProps> = ({}) => {
  const { data, isPending, error } = useListOrganizations();

  const { data: membersData } = trpc.getOrganizationMembers.useQuery();

  const columns = useMemo(
    () =>
      [
        {
          accessor: "name",
          title: "Name",
          render: (row) => (
            <Box py="xs">
              <Group>
                <Avatar src={row.logo} size="32" radius="sm" />
                <Text size="sm" fw="bold">
                  {row.name}
                </Text>
              </Group>
            </Box>
          ),
        },
        {
          textAlign: "right",
          accessor: "id",
          render: (row) => (
            <ActionIcon variant="subtle">
              <IconDots size={16} />
            </ActionIcon>
          ),
        },
      ] as DataTableColumn<Organization>[],
    []
  );

  return (
    <div className={classes.root}>
      <DataTable noHeader columns={columns} records={data || []} />
    </div>
  );
};
