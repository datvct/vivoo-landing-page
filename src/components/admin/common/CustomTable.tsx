"use client";

import React from "react";
import { Table } from "antd";
import type {
  ColumnsType,
  ColumnType,
  TablePaginationConfig,
  TableProps,
} from "antd/es/table";

export type CustomTableProps<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey?:
    | string
    | ((record: T) => React.Key);
  pagination?:
    | TablePaginationConfig
    | false;
  loading?: boolean;
  selectable?: boolean;
  selectedRowKeys?: React.Key[];
  onSelectionChange?: (
    selectedRowKeys: React.Key[],
    selectedRows: T[]
  ) => void;
  onChange?: TableProps<T>["onChange"];
  actionsRender?: (
    record: T
  ) => React.ReactNode;
  className?: string;
  scroll?: {
    x?: number | true;
    y?: number;
  };
  size?: "default" | "middle" | "small";
};

export default function CustomTable<T>({
  columns,
  dataSource,
  rowKey = "id",
  pagination = {
    pageSize: 12,
    showSizeChanger: false,
  },
  loading = false,
  selectable = false,
  selectedRowKeys,
  onSelectionChange,
  onChange,
  actionsRender,
  className,
  scroll,
  size = "default",
}: CustomTableProps<T>): React.ReactElement {
  const finalColumns = React.useMemo<
    ColumnsType<T>
  >(() => {
    if (!actionsRender) return columns;

    const actionsColumn: ColumnType<T> =
      {
        title: "Thao Tác",
        key: "actions",
        width: 100,
        fixed: "right",
        render: (
          _value: unknown,
          record: T
        ) => actionsRender(record),
      };

    return [...columns, actionsColumn];
  }, [columns, actionsRender]);
  const rowSelection: TableProps<T>["rowSelection"] =
    selectable
      ? {
          selectedRowKeys,
          onChange: (
            keys: React.Key[],
            rows: T[]
          ) =>
            onSelectionChange?.(
              keys,
              rows
            ),
        }
      : undefined;

  const tableProps: TableProps<T> = {
    columns: finalColumns,
    dataSource,
    rowKey:
      rowKey as TableProps<T>["rowKey"],
    pagination:
      pagination as TableProps<T>["pagination"],
    loading,
    rowSelection,
    onChange:
      onChange as TableProps<T>["onChange"],
    className,
    scroll,
    size: size as TableProps<T>["size"],
  };

  return <Table {...tableProps} />;
}
