import type { JSX } from "react/jsx-runtime";
import classes from "./DataTable.module.css";
import {
  type DataTableColumn,
  DataTable as MDataTable,
  type DataTableProps as MDataTableProps,
} from "mantine-datatable";

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  records: T[];
  error?: Error | null;
}

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  records,
  onRowClick,
  ...otherProps
}: DataTableProps<T> & MDataTableProps<T>): JSX.Element => {
  return (
    <MDataTable
      onRowClick={onRowClick}
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
