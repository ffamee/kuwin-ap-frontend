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
// import { DataTableFilter } from "./data-table-filter";
// import { Button } from "../ui/button";
import { Search } from "lucide-react";

import DataTable from "./data-table";

interface ReplaceSelectTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function ReplaceSelectTable<TData, TValue>({
	columns,
	data,
}: ReplaceSelectTableProps<TData, TValue>) {
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

	// const isFiltered = table.getState().columnFilters.length > 0;

	const getRowClassName = (row: TData) => {
		const eol = "eol" in Object(row) ? Object(row).eol : null;
		const eos = "eos" in Object(row) ? Object(row).eos : null;
		return !eol && !eos ? "red" : !eol || !eos ? "amber" : ""; // Example logic
	};

	return (
		<div className="w-full space-y-4 overscroll-y-none">
			<div className="flex items-center space-x-2">
				<Search className="text-gray-400" />
				<Input
					placeholder="Model"
					value={(table.getColumn("group")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("group")?.setFilterValue(event.target.value)
					}
					className=""
				/>
			</div>
			<DataTable
				columns={columns}
				table={table}
				headerRowClassName="bg-gray-200"
				data-row={getRowClassName}
				rowClassName="data-[row='red']:border-red-500 data-[row='red']:border-2 data-[row='red']:bg-red-200
				 data-[row='amber']:bg-amber-100"
			/>
		</div>
	);
}
