import React, { useMemo } from "react";
import classes from "./OrganizationsList.module.css";
import { DataTable } from "@/components/common/DataTable";
import { DataTableColumn } from "mantine-datatable";

export interface OrganizationsListProps {}

export const OrganizationsList: React.FC<OrganizationsListProps> = ({}) => {
  const data = [
    {
      id: 1,
      name: "Organization 1",
      members: 10,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Organization 2",
      members: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Organization 3",
      members: 30,
      createdAt: new Date().toISOString(),
    },
  ];

  const columns: DataTableColumn[] = useMemo(
    () => [
      { accessor: "name", title: "Name" },
      { accessor: "members", title: "Members" },
      { accessor: "createdAt", title: "Created at" },
    ],
    []
  );

  return (
    <div className={classes.root}>
      <DataTable columns={columns} records={data} />
    </div>
  );
};
