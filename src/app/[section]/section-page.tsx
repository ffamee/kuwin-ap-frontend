"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { ApData } from "./page";

const columns = [
  { accessorKey: "name", header: "Faculty" },
  { accessorKey: "numAp", header: "# AP (overall)" },
  { accessorKey: "numCl", header: "# Client" },
];

export default function SectionPage({
  section,
  data,
}: {
  section: string;
  data: ApData[];
}) {
  const headerName: string = section;
  return (
    <div className="bg-[#FFFEEA] font-sans w-full p-4 h-auto overflow-y-auto no-scrollbar">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        {headerName} ในมหาวิทยาลัยเกษตรศาสตร์
      </h1>
      <div className="w-full">
        <DataTable column={columns} data={data} />
      </div>
    </div>
  );
}
