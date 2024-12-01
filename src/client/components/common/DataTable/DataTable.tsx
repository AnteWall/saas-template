import React from "react";
import classes from "./DataTable.module.css";
import { DataTableColumn, DataTable as MDataTable } from "mantine-datatable";

export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  records: T[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, records }) => {
  return (
    <MDataTable
      withRowBorders
      withTableBorder
      borderRadius="md"
      records={records}
      columns={columns}
      classNames={{
        root: classes.root,
        header: classes.header,
        table: classes.table,
      }}
    />
  );
};
