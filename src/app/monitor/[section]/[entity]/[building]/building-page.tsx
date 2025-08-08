"use client";

import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import { ExPieChart } from "@/components/chart/example-pie-chart";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { BuildingOverview } from "@/types/building-type";
import {
  CircleAlert,
  Delete,
  SquarePen,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import * as React from "react";
import SummaryCard from "@/components/card/summary-card";
// import ApOverviewCard from "@/components/card/ap-overview-card";
import { ColumnDef } from "@tanstack/react-table";
import { BuildingTable } from "@/components/table/building-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfigAdding from "@/components/modal/config-adding";
import { useState } from "react";
import BuildingEdit from "@/components/modal/building-edit";
import { ConfigOverview, StatusState } from "@/types/config-type";

const colorsMap: Record<StatusState, string> = {
  UP: "bg-green-500",
  DOWN: "bg-red-500",
  MAINTENANCE: "bg-yellow-500",
  RADIO_OFF: "bg-cyan-500",
  PENDING: "bg-gray-500",
  MISMATCH: "bg-black-500",
  DOWNLOAD: "bg-red-300",
};

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

export default function BuildingPage({
  buildingId,
  entityId,
  data,
}: {
  entityId: number;
  buildingId: number;
  data: BuildingOverview & { configurations: ConfigOverview[] };
}) {
  const [tab, setTab] = useState<string>("list");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [configs, setConfigs] = useState(data.configurations);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };

  //Changing Table
  const [modalAddingOpen, setModalAddingOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleAddConfig = (config: ConfigOverview) => {
    setConfigs((prev) => [config, ...prev]);
  };

  //console.log(data);
  const columns: ColumnDef<ConfigOverview>[] = [
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" className="" />
      ),
      cell: ({ row }) => {
        return (
          <div className="px-4">
            <div
              className={`rounded-full size-4 ${
                colorsMap[row.getValue("status") as StatusState]
              }`}
            />
          </div>
        );
      },
      filterFn: (row, columnId, filterValue: string[]) => {
        const value = row.getValue(columnId) as string;

        if (filterValue.length === 0) return true;

        return filterValue.includes(value);
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      filterFn: (row, columnId, value) => {
        const rowData: string = row.original.location.name ?? "-";
        return rowData.toLowerCase().includes(value.toLowerCase());
      },
      cell: ({ row }) => {
        const url = "./" + buildingId + "/" + row.original.id;
        return (
          <Link href={url} className="max-w-xs whitespace-normal break-words">
            {row.original.location.name ?? "-"}
          </Link>
        );
      },
    },
    {
      accessorKey: "problem",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Problem" />
      ),
      enableSorting: false,
    },

    {
      id: "client24",
      accessorFn: (row) => Number(row.client24),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="#Client 2.4GHz"
          // className="w-20 whitespace-normal break-words"
        />
      ),
      filterFn: (row, columnId, filterValue: string[]) => {
        const value = Number(row.getValue(columnId));

        const matchEqual = filterValue.includes("eq") && value === 0;
        const matchGtZero = filterValue.includes("gt") && value > 0;

        if (filterValue.length === 0) return true;

        return matchEqual || matchGtZero;
      },
      cell: ({ row }) => {
        const value = row.original.client24 ?? "-";
        return <div>{value}</div>;
      },
    },

    {
      id: "client5",
      accessorFn: (row) => Number(row.client5),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="#Client 5GHz"
          className="w-fit whitespace-normal break-words"
        />
      ),
      filterFn: (row, columnId, filterValue: string[]) => {
        const value = Number(row.getValue(columnId));

        const matchEqual = filterValue.includes("eq") && value === 0;
        const matchGtZero = filterValue.includes("gt") && value > 0;

        if (filterValue.length === 0) return true;

        return matchEqual || matchGtZero;
      },
      cell: ({ row }) => {
        const value = row.original.client5 ?? "-";
        return <div>{value}</div>;
      },
    },

    {
      id: "client6",
      accessorFn: (row) => Number(row.client6),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="#Client 6GHz"
          className="w-fit whitespace-normal break-words"
        />
      ),
      filterFn: (row, columnId, filterValue: string[]) => {
        const value = Number(row.getValue(columnId));

        const matchEqual = filterValue.includes("eq") && value === 0;
        const matchGtZero = filterValue.includes("gt") && value > 0;

        if (filterValue.length === 0) return true;

        return matchEqual || matchGtZero;
      },
      cell: ({ row }) => {
        const value = row.original.client6 ?? "-";
        return <div>{value}</div>;
      },
    },

    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const url = "./" + buildingId + "/" + row.original.id;
        return (
          <div className="flex item-center-safe justify-evenly">
            <Link href={url}>
              <span>
                <SquarePen size={16} />
              </span>
            </Link>
            <Link href={url}>
              <span>
                <Delete size={16} />
              </span>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full p-4 min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
      <div className="text-left font-bold capitalize text-6xl my-4">
        {data.name}
      </div>
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
            Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count)
          }
          Icon={Users}
          description="some description"
        />
      </div>
      <Tabs value={tab} onValueChange={handleChange} className="w-full">
        <div className="flex justify-between">
          <TabsList className="grid w-fit h-fit grid-cols-3 border mb-2">
            <TabsTrigger value="list" className="text-center">
              List
            </TabsTrigger>
            <TabsTrigger value="overview" className="text-center">
              Overview
            </TabsTrigger>
            <TabsTrigger value="card" className="text-center">
              Card
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setModalAddingOpen(true)}
                >
                  Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add new access point</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setModalEditOpen(true)}
                >
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit this Building details</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <ConfigAdding
          modalOpen={modalAddingOpen}
          onClose={() => setModalAddingOpen(false)}
          basicDetails={{
            entity: "",
            building: data.name,
            buildingId: data.id,
          }}
          onConfigAdded={handleAddConfig}
        />
        <BuildingEdit
          modalOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          basicDetails={{
            buildingName: data.name,
            buildingId: data.id,
            entityId: entityId,
          }}
        />
        <div>
          {isLoading ? (
            <Skeleton className="w-full h-52" />
          ) : (
            <div>
              <TabsContent value="overview">
                <div className="grid grid-cols-3 space-x-4">
                  <div>
                    <ExPieChart chartData={chartData} />
                  </div>
                  <div className="col-span-2">
                    <ExInteractiveChart />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="list">
                {configs.length ? (
                  <BuildingTable columns={columns} data={configs} />
                ) : (
                  <div className="bg-secondary/50 flex items-center-safe justify-center-safe h-40 rounded-lg text-muted-foreground">
                    No AP in this Building
                  </div>
                )}
              </TabsContent>
              {/* <TabsContent value="card">
                <Card>
                  <CardHeader>
                    <CardTitle>Access Points</CardTitle>
                    <CardDescription>
                      Overview of all access points in this building.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
                      {data.configurations?.map((config) => (
                        <ApOverviewCard
                          key={config.id}
                          buildingId={buildingId}
                          ap={config}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
