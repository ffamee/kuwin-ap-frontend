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

interface BuildingTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function BuildingTable<TData, TValue>({
  columns,
  data,
}: BuildingTableProps<TData, TValue>) {
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
          placeholder="Filter Access Point ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className=""
        />
        {table.getColumn("status") && (
          <DataTableFilter
            column={table.getColumn("status")}
            title="Status"
            options={["up", "ma", "down", "rOff", "second"]}
          />
        )}
        {table.getColumn("client24") && (
          <DataTableFilter
            column={table.getColumn("client24")}
            title="Client 2.4GHz"
            options={["eq", "gt"]}
          />
        )}
        {table.getColumn("client5") && (
          <DataTableFilter
            column={table.getColumn("client5")}
            title="Client 5GHz"
            options={["eq", "gt"]}
          />
        )}
        {table.getColumn("client6") && (
          <DataTableFilter
            column={table.getColumn("client6")}
            title="Client 6GHz"
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
