"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { ApData } from "./page";
import SummaryCard from "@/components/card/summary-card";

const columns = [
  { accessorKey: "name", header: "Faculty" },
  { accessorKey: "numAp", header: "# AP (overall)" },
  { accessorKey: "numCl", header: "# Client" },
];

const sumData = {
  totalAP: 40,
  totalAPMaintain: 2,
  totalAPDown: 5,
  totalUser: 20,
};

export default function SectionPage({
  section,
  data,
}: {
  section: string;
  data: ApData[];
}) {
  const headerName: string = section.charAt(0).toUpperCase() + section.slice(1);
  const entity = data.map((e) => ({
    ...e,
    name: { url: section + "/" + e.id, name: e.name },
  }));

  return (
    <div className="bg-[#FFFEEA] font-sans w-full p-4 h-auto overflow-y-auto no-scrollbar">
      <h1 className="text-left font-bold m-4 text-[48px]">{headerName}</h1>
      <SummaryCard sumData={sumData} />
      <div className="m-4">
        <DataTable column={columns} data={entity} />
      </div>
    </div>
  );
}
