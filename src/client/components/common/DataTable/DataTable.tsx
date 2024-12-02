import React from "react";
import classes from "./DataTable.module.css";
import {
  DataTableColumn,
  DataTable as MDataTable,
  DataTableProps as MDataTableProps,
} from "mantine-datatable";

export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  records: T[];
}

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  records,
  ...otherProps
}: DataTableProps & MDataTableProps<T>) => {
  return (
    <MDataTable
      withRowBorders
      withTableBorder
      highlightOnHover
      borderRadius="md"
      records={records}
      columns={columns}
      classNames={{
        root: classes.root,
        header: classes.header,
        table: classes.table,
      }}
      {...otherProps}
    />
  );
};
