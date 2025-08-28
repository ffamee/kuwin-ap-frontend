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
import fetcher from "@/lib/fetcher";
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
    filterFn: (row, _columnId, value) => {
      const rowData: string = row.getValue("name");
      return rowData.toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ row }) => {
      const url = "/monitor/" + row.original.id;
      return (
        <Link
          href={url}
          className="max-w-xs whitespace-normal break-words capitalize"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "configCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#AP (overall)" />
    ),
  },
  {
    accessorKey: "maCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#AP (maintain)" />
    ),
  },
  {
    accessorKey: "downCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#AP (down)" />
    ),
  },
  {
    id: "totalUser",
    accessorFn: (row) =>
      Number(row.c24Count) + Number(row.c5Count) + Number(row.c6Count),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#User" />
    ),
    cell: ({ row }) => {
      const total =
        Number(row.original.c24Count) +
        Number(row.original.c5Count) +
        Number(row.original.c6Count);
      return <div>{total}</div>;
    },
  },
];

export default function Page() {
  const [data, setData] = React.useState<
    | ({
        configCount: number;
        maCount: number;
        downCount: number;
        c24Count: number;
        c5Count: number;
        c6Count: number;
      } & {
        sections: SectionOverview[];
      })
    | null
  >(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetcher("/section/monitor");
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
    }, 5 * 60 * 1000);

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
                data={data.configCount}
                Icon={Wifi}
                color="text-green-500"
                description="some description"
              />
              <SummaryCard
                title="Maintain Access Points"
                data={data.maCount}
                Icon={CircleAlert}
                color="text-yellow-400"
                description="some description"
              />
              <SummaryCard
                title="Down Access Points"
                data={data.downCount}
                Icon={WifiOff}
                color="text-red-500"
              />
              <SummaryCard
                title="Total Users"
                data={
                  Number(data.c24Count) +
                  Number(data.c5Count) +
                  Number(data.c6Count)
                }
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
