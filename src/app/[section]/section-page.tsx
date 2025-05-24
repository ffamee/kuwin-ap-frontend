"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EntityOverview } from "@/types/entity-type";
import { SectionOverview } from "@/types/section-type";
import { SectionTable } from "@/components/table/section-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import Link from "next/link";

export default function SectionPage({
	section,
	data,
}: {
	section: string;
	data: SectionOverview & { entities: EntityOverview[] };
}) {
	const columns: ColumnDef<EntityOverview>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			filterFn: (row, columnId, value) => {
				const rowData: string = row.getValue("name");
				return rowData.toLowerCase().includes(value.toLowerCase());
			},
			cell: ({ row }) => {
				const url = "/" + section + "/" + row.original.id;
				return <Link href={url}> {row.getValue("name")}</Link>;
			},
		},
		{
			accessorKey: "apAll",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="#AP (overall)" />
			),
		},
		{
			accessorKey: "apMaintain",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="#AP (maintain)" />
			),
			filterFn: (row, columnId, filterValue: string[]) => {
				const value = Number(row.getValue(columnId));

				const matchEqual = filterValue.includes("eq") && value === 0;
				const matchGtZero = filterValue.includes("gt") && value > 0;

				if (filterValue.length === 0) return true;

				return matchEqual || matchGtZero;
			},
		},
		{
			accessorKey: "apDown",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="#AP (down)" />
			),
			filterFn: (row, columnId, filterValue: string[]) => {
				const value = Number(row.getValue(columnId));

				const matchEqual = filterValue.includes("eq") && value === 0;
				const matchGtZero = filterValue.includes("gt") && value > 0;

				if (filterValue.length === 0) return true;

				return matchEqual || matchGtZero;
			},
		},
		{
			id: "totalUser",
			accessorFn: (row) => Number(row.user1) + Number(row.user2),
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="#User" />
			),
			cell: ({ row }) => {
				const total = Number(row.original.user1) + Number(row.original.user2);
				return <div>{total}</div>;
			},
		},
	];

	return (
		<div className="font-sans w-full p-4 h-auto overflow-y-auto no-scrollbar">
			<h1 className="text-left font-bold m-4 text-[48px] italic">
				Zone ที่ {section} ในมหาวิทยาลัยเกษตรศาสตร์
			</h1>
			<div className="w-full">
				<SectionTable columns={columns} data={data.entities} />
			</div>
		</div>
	);
}
