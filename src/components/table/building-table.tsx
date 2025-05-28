"use client";

import * as React from "react";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
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

import { DataTablePagination } from "./data-table-pagination";
import { Input } from "@/components/ui/input";
import { DataTableFilter } from "./data-table-filter";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

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
				{table.getColumn("client") && (
					<DataTableFilter
						column={table.getColumn("client")}
						title="Client 2.4GHz"
						options={["eq", "gt"]}
					/>
				)}
				{table.getColumn("client2") && (
					<DataTableFilter
						column={table.getColumn("client2")}
						title="Client 5GHz"
						options={["eq", "gt"]}
					/>
				)}
				{table.getColumn("wlc") && (
					<DataTableFilter
						column={table.getColumn("wlc")}
						title="WLC"
						options={["Yes", "No"]}
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
			<div className="rounded-md border">
				<Table className="border-b">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
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
