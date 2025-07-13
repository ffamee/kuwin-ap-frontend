"use client";

import SectionCard from "@/app/monitor/[section]/section-card";
import SectionTab from "./section-tab";

import { ColumnDef } from "@tanstack/react-table";
import { EntityOverview } from "@/types/entity-type";
import { SectionOverview } from "@/types/section-type";

import { DataTableColumnHeader } from "@/components/table/data-table-header";
import Link from "next/link";

// const chartData1 = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartData2 = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

export default function SectionPage({
  section,
  data,
}: {
  section: string;
  data: SectionOverview & { entities: EntityOverview[] };
}) {
  const sumData = {
    totalAP: data.apAll,
    totalAPMaintain: data.apMaintain,
    totalAPDown: data.apDown,
    totalUser: data.totalUser,
  };
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
        const url = "/monitor/" + section + "/" + row.original.id;
        return (
          <Link href={url} className="max-w-xs whitespace-normal break-words">
            {row.getValue("name")}
          </Link>
        );
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
    <div className="flex flex-col p-4 gap-4 w-full min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
      <h1 className="text-left font-bold text-[48px] capitalize">
        {data.name}
      </h1>
      <SectionCard sumData={sumData} />

      <div>
        <SectionTab header={columns} data={data.entities} />
      </div>
    </div>
  );
}
