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
    totalAP: data.apAll,
    totalAPMaintain: data.apMaintain,
    totalAPDown: data.apDown,
    totalUser: data.totalUser,
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
    {
      id: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex item-center-safe justify-evenly">
            {/* <div>
              <span>
                <SquarePen
                  size={16}
                  onClick={() => (
                    setModalOpen(true),
                    (
                      <EntityEdit
                        modalOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        basicDetails={{
                          section: data.name,
                          entityName: row.original.name,
                          entityId: row.original.id,
                        }}
                      />
                    )
                  )}
                />
              </span>
            </div> */}
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
