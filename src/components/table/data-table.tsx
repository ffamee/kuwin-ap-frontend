"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";

import { CircleX } from "lucide-react";
import Link from "next/link";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-viewoption";

import DataTableAction from "./data-table-action";
import { DataTableColumnHeader } from "./data-table-header";

// mock-up type filter
type PaymentFilter = {
  status?: ("pending" | "processing" | "success" | "failed") | undefined;
  bool?: boolean | undefined;
};

interface TableColumn {
  accessorKey?: string;
  id?: string;
  header?: string;
  ceil?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  navRoute?: string;
}

interface DataTableProps<T extends object> {
  column: TableColumn[];
  data: T[];
}

export function DataTable<T extends object>({
  column,
  data,
}: DataTableProps<T>) {
  const columns: ColumnDef<T>[] = column.map((col) => {
    if (col.accessorKey === undefined && col.id === undefined) {
      throw new Error("Either accessorKey or id must be defined");
    }
    const accessorKey = col.accessorKey ?? col.id!;
    const id = col.id ?? col.accessorKey!;
    return {
      accessorKey,
      id,
      header: ({ column }) => {
        return col.header === undefined ? (
          <></>
        ) : (
          <DataTableColumnHeader column={column} title={col.header} />
        );
      },
      cell: ({ row }) => {
        if (accessorKey === "bool") {
          const bool = row.getValue("bool");
          return (
            <div className="text-left font-medium">
              {bool ? "True" : "False"}
            </div>
          );
        }
        if (accessorKey === "actions") {
          return <DataTableAction row={row} />;
        }
        if (accessorKey === "name") {
          const name: { name: string; url: string } = row.getValue("name");
          return (
            <div>
              <Link href={name.url}>{name.name}</Link>
            </div>
          );
        }
        return <div>{row.getValue(accessorKey)}</div>;
      },
      enableSorting: col.enableSorting ?? true,
      enableColumnFilter: col.enableFiltering ?? true,
    };
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // not completely sure about this type
  const [rowSelection, setRowSelection] = React.useState<PaymentFilter>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters, // Use the column filters state here
      columnVisibility, // Use the column visibility state here
    },
    enableMultiSort: true,
  });

  React.useEffect(() => {
    // fetch
  }, [rowSelection]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 w-full">
        {/* <Input
          placeholder="Search Zone ..."
          value={
            (table
              .getColumn(column[0].accessorKey!)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(column[0].accessorKey!)
              ?.setFilterValue(event.target.value)
          }
          className="w-full"
        /> 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 flex">
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            {["pending", "processing", "success", "failed"].map((status) => {
              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  checked={
                    rowSelection.status ? rowSelection.status === status : false
                  }
                  onCheckedChange={() =>
                    setRowSelection((prev) => {
                      if (prev.status === status) {
                        delete prev.status;
                        return { ...prev };
                      }
                      return Object.assign({ ...prev }, { status: status });
                    })
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 flex">
              Bool
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            {[true, false].map((status, index) => {
              return (
                <DropdownMenuCheckboxItem
                  key={index}
                  className="capitalize"
                  checked={
                    "bool" in rowSelection && rowSelection.bool === status
                      ? true
                      : false
                  }
                  onCheckedChange={() =>
                    setRowSelection((prev) => {
                      if (prev.bool === status) {
                        delete prev.bool;
                        return { ...prev };
                      }
                      return { ...prev, bool: status };
                    })
                  }
                >
                  {status ? "True" : "False"}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>*/}
        <DataTableViewOptions table={table} />
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex w-full justify-between">
          <div className="flex items-center space-x-2">
            {Object.entries(rowSelection).map(([key, value]) => (
              <div key={key} className="text-sm text-muted-foreground">
                {`${key}: ${value}`}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size={"sm"}
            onClick={() => setRowSelection({})}
            className="text-sm text-accent-foreground rounded-3xl"
          >
            Reset
            <CircleX />
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table className="border-b">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
