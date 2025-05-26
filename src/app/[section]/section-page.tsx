"use client";

import React from "react";
//import { ApData } from "./page";
import SummaryCard from "@/components/card/summary-card";

// const columns = [
//   { accessorKey: "name", header: "Name" },
//   { accessorKey: "apALL", header: "# AP (overall)" },
//   { accessorKey: "apMaintain", header: "# AP (maintain)" },
//   { accessorKey: "apDown", header: "# AP (down)" },
//   { accessorKey: "user1", header: "# User" },
// ];

import { ColumnDef } from "@tanstack/react-table";
import { EntityOverview } from "@/types/entity-type";
import { SectionOverview } from "@/types/section-type";
import { SectionTable } from "@/components/table/section-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import Link from "next/link";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function SectionPage({
  section,
  data,
}: {
  section: string;
  data: SectionOverview & { entities: EntityOverview[] };
}) {
  const [tab, setTab] = React.useState<string>("list");
  setTimeout(() => {
    console.log("loading");
  }, 10000);
  console.log(data);
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
    <div className="w-screen p-4 m-4 h-screen overflow-y-auto no-scrollbar">
      <h1 className="text-left font-bold m-4 text-[48px] capitalize">
        {section}
      </h1>
      <SummaryCard sumData={sumData} />
      <Tabs
        value={tab}
        onValueChange={() => setTab("overview")}
        className="w-full"
      >
        <TabsList className="grid w-fit grid-cols-2 border">
          <TabsTrigger value="overview" className="text-center m-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="list" className="text-center m-2">
            List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          This should be The MF Overview
        </TabsContent>
        <TabsContent value="list">
          <div className="w-full">
            <SectionTable columns={columns} data={data.entities} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
