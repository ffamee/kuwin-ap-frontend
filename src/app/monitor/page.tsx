"use client";
import SummaryCard from "@/components/card/summary-card";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
// import { ExPieChart } from "@/components/chart/example-pie-chart";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { MonitorTable } from "@/components/table/monitor-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionOverview } from "@/types/section-type";
import { ColumnDef } from "@tanstack/react-table";
import { CircleAlert, Users, Wifi, WifiOff } from "lucide-react";
import Link from "next/link";
import * as React from "react";

// const chartData = [
// 	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
// 	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
// 	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
// 	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
// 	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

const columns: ColumnDef<SectionOverview>[] = [
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
			const url = "/monitor/" + row.original.id;
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
	},
	{
		accessorKey: "apDown",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="#AP (down)" />
		),
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

export default function Page() {
	const [data, setData] = React.useState<
		| ({
				apAll: number;
				apMaintain: number;
				apDown: number;
				totalUser: number;
		  } & {
				sections: SectionOverview[];
		  })
		| null
	>(null);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const data = await fetch("http://localhost:3001/section/monitor");
				if (!data.ok) {
					throw new Error("Network response was not ok");
				}
				setData(await data.json());
			} catch (error) {
				console.error("Error fetching data:", error);
				throw new Error("Failed to fetch data");
			}
		}
		// create set interval to fetch data every 5 seconds
		const interval = setInterval(() => {
			console.log("Fetching data...");
			fetchData();
		}, 5000);

		fetchData(); // Initial fetch
		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	return (
		<div className="flex flex-col gap-4 w-full p-4 min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
			<div className="text-center font-semibold capitalize text-4xl my-6">
				Status Access Point
			</div>
			{/* <div className="text-center my-3 bg-red-200">menu admin</div> */}
			<div>
				{data ? (
					<div className="flex flex-col gap-4 w-full">
						<div className="grid grid-cols-4 gap-4">
							<SummaryCard
								title="Total Access Points"
								data={data.apAll}
								Icon={Wifi}
								color="text-green-500"
								description="some description"
							/>
							<SummaryCard
								title="Maintain Access Points"
								data={data.apMaintain}
								Icon={CircleAlert}
								color="text-yellow-400"
								description="some description"
							/>
							<SummaryCard
								title="Down Access Points"
								data={data.apDown}
								Icon={WifiOff}
								color="text-red-500"
							/>
							<SummaryCard
								title="Total Users"
								data={data.totalUser}
								Icon={Users}
								description="some description"
							/>
						</div>
						<div className="flex flex-row gap-6">
							<div className="w-full md:w-1/2 lg:w-2/5">
								<ExInteractiveChart />
							</div>
							<Card className="w-full justify-center">
								<CardHeader>
									<CardTitle>OverAll Table</CardTitle>
									<CardDescription>
										This is an overall data of access points
									</CardDescription>
								</CardHeader>
								<CardContent>
									<MonitorTable columns={columns} data={data.sections} />
								</CardContent>
							</Card>
						</div>
					</div>
				) : (
					<Skeleton className="w-full h-96" />
				)}
			</div>
		</div>
	);
}
