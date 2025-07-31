"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableFilter } from "./data-table-filter";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

import DataTable from "./data-table";

interface SectionTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function SectionTable<TData, TValue>({
  columns,
  data,
}: SectionTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // not completely sure about this type
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    enableMultiSort: true,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters, // Use the column filters state here
      columnVisibility, // Use the column visibility state here
      rowSelection,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="w-full space-y-4 overscroll-y-none">
      <div className="flex items-center space-x-2">
        <Search className="text-gray-400" />
        <Input
          placeholder="Filter Entity ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className=""
        />
        {table.getColumn("maCount") && (
          <DataTableFilter
            column={table.getColumn("maCount")}
            title="Maintain"
            options={["eq", "gt"]}
          />
        )}
        {table.getColumn("downCount") && (
          <DataTableFilter
            column={table.getColumn("downCount")}
            title="Down"
            options={["eq", "gt"]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  );
}
