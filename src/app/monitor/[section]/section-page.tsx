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
import { useState } from "react";
import Confirmation from "@/components/modal/confirmation";
import { useAuth } from "@/context/auth-context";

export default function SectionPage({
  section,
  data,
}: {
  section: number;
  data: SectionOverview & { entities: EntityOverview[] };
}) {
  const sumData = {
    totalAP: data.configCount,
    totalAPMaintain: data.maCount,
    totalAPDown: data.downCount,
    totalUser:
      Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count),
  };
  const [entities, setEntities] = useState(data.entities);
  const { isLogin } = useAuth();

  // function about adding entity part
  const handleAddEntity = (entity: EntityOverview) => {
    setEntities((prev) => [entity, ...prev]);
  };

  // function about deleting part
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const handleDeleteEntity = async (entityId: number) => {
    const res = await DeleteEntity(entityId, "");
    if ("statusCode" in res) {
      if (res.statusCode === 409) {
        setDeleteId(entityId);
        setOpenConfirmation(true);
      }
    } else {
      setEntities((prev) => prev.filter((entity) => entity.id !== entityId));
      setDeleteId(null);
    }
    console.log(res);
    return;
  };
  const handleConfirm = async () => {
    if (!deleteId) return;
    const res = await DeleteEntity(deleteId, "?confirm=true");
    if (!("statusCode" in res)) {
      setEntities((prev) => prev.filter((entity) => entity.id !== deleteId));
      setDeleteId(null);
    }
    console.log(res);
  };

  const columns: ColumnDef<EntityOverview>[] = [
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
      header: ({ column }) =>
        isLogin ? (
          <DataTableColumnHeader column={column} title="Action" />
        ) : null,
      cell: ({ row }) => {
        if (!isLogin) return;
        return (
          <div className="flex item-center-safe justify-evenly">
            <div>
              <span>
                <DeleteComfirm
                  onConfirm={() => {
                    setDeleteId(row.original.id);
                    handleDeleteEntity(row.original.id);
                  }}
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
      <div>
        {
          <div>
            <h1 className="text-left font-bold text-[48px] capitalize">
              {data.name}
            </h1>
            <SectionCard sumData={sumData} />

            <div>
              <SectionTab
                header={columns}
                data={entities}
                section={{ id: data.id, name: data.name }}
                onAddEntity={handleAddEntity}
              />
            </div>
          </div>
        }

        <Confirmation
          open={openConfirmation}
          onOpenChange={setOpenConfirmation}
          onConfirm={handleConfirm}
          title="Are you sure to delete?"
          message="This Entity already has Building"
        />
      </div>
    </div>
  );
}
