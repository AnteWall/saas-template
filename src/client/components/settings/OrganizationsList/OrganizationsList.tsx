import React from "react";
import { useListOrganizations } from "@/hooks/auth/useListOrganizations";
import { IconDots } from "@tabler/icons-react";
import { DataTable } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { OrganizationStats } from "./OrganizationStats";

interface Organization {
  id: string;
  createdAt: Date;
  name: string;
  slug?: string | null;
  metadata?: unknown;
  logo?: string | null | undefined;
}

const columnHelper = createColumnHelper<Organization>();

export const OrganizationsList: React.FC = () => {
  const { data } = useListOrganizations();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row }) => (
        <OrganizationStats
          orgnaizationName={row.getValue("name")}
          logo={row.original.logo}
          organizationId={row.original.id}
        />
      ),
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: () => (
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon">
            <IconDots size={16} />
          </Button>
        </div>
      ),
    }),
  ];

  return <DataTable columns={columns} data={data ?? []} />;
};
