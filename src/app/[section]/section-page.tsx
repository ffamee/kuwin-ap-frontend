"use client";

import { DataTable } from "@/components/table/data-table";
import React from "react";
import { ApData } from "./page";

const columns = [
	{ accessorKey: "location", header: "Faculty" },
	{ accessorKey: "all", header: "# AP (overall)" },
	{ accessorKey: "maintain", header: "# AP (maintain)" },
	{ accessorKey: "down", header: "# AP (down)" },
	{ accessorKey: "c24", header: "# Client (2.4GHz)" },
	{ accessorKey: "c50", header: "# Client (5.0GHz)" },
	{ accessorKey: "wlc", header: "# WLC" },
];

export default function SectionPage({
	section,
	data,
}: {
	section: string;
	data: ApData[];
}) {
	return (
		<div className="bg-[#FFFEEA] font-sans w-full p-4 h-auto overflow-y-auto no-scrollbar">
			<h1 className="text-left font-bold m-4 text-[48px] italic">
				Zone ที่ {section} ในมหาวิทยาลัยเกษตรศาสตร์
			</h1>
			<div className="w-full">
				<DataTable column={columns} data={data} />
			</div>
		</div>
	);
}
