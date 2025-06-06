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

import DataTable from "./data-table";
// import { Input } from "@/components/ui/input";
// import { DataTableFilter } from "./data-table-filter";
// import { Button } from "../ui/button";
// import { Search, X } from "lucide-react";

interface MonitorTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function MonitorTable<TData, TValue>({
	columns,
	data,
}: MonitorTableProps<TData, TValue>) {
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

	return (
		<div className="w-full space-y-4 overscroll-y-none">
			<DataTable columns={columns} table={table} />
		</div>
	);
}
