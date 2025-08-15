"use client";

import SectionCard from "@/app/monitor/[section]/section-card";
import SectionTab from "./section-tab";

import { ColumnDef } from "@tanstack/react-table";
import { EntityOverview } from "@/types/entity-type";
import { SectionOverview } from "@/types/section-type";

import { DataTableColumnHeader } from "@/components/table/data-table-header";
import DeleteComfirm from "@/components/modal/confirmdelete";
import Link from "next/link";
import { DeleteEntity } from "@/api/entity-api";

export default function SectionPage({
  section,
  data,
}: {
  section: string;
  data: SectionOverview & { entities: EntityOverview[] };
}) {
  const sumData = {
    totalAP: data.configCount,
    totalAPMaintain: data.maCount,
    totalAPDown: data.downCount,
    totalUser:
      Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count),
  };

  const handleDeleteEntity = (entityId: number) => {
    DeleteEntity(entityId);
  };

  //const [modalOpen, setModalOpen] = useState(false);
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
      accessorKey: "configCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#AP (overall)" />
      ),
      cell: ({ row }) => {
        return row.original.configCount ?? "-";
      },
    },
    {
      accessorKey: "maCount",
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
      cell: ({ row }) => {
        return row.original.maCount ?? "-";
      },
    },
    {
      accessorKey: "downCount",
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
      cell: ({ row }) => {
        return row.original.downCount ?? "-";
      },
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
          Number(row.original.c24Count ?? 0) +
          Number(row.original.c5Count ?? 0) +
          Number(row.original.c6Count ?? 0);
        return <div>{total}</div>;
      },
    },
    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex item-center-safe justify-evenly">
            <div>
              <span>
                <DeleteComfirm
                  onConfirm={() => handleDeleteEntity(row.original.id)}
                />
              </span>
            </div>
          </div>
        );
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
        <SectionTab
          header={columns}
          data={data.entities}
          section={{ id: data.id, name: data.name }}
        />
      </div>
    </div>
  );
}
