import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import AdminDeviceTable from "@/components/table/admin-device-table";

import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";

import { DownApTab } from "@/types/ap-type";
import { GetDownConfigurations } from "./device-handler";

const DataTableDuration = dynamic(
  () => import("@/components/table/data-table-duration"),
  { ssr: false }
);

const data = await GetDownConfigurations();

export default function AdminDownDeviceTable() {
  const columns: ColumnDef<DownApTab>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      filterFn: (row, columnId, value) => {
        const rowData: string = row.getValue("name");
        if (!row.original.name) return false;
        return rowData.toLowerCase().includes(value.toLowerCase());
      },
      cell: ({ row }) => {
        if (!row.original.name) return <div>NaN</div>;
        const url =
          "/monitor/" +
          row.original.building.entity.section.id +
          "/" +
          row.original.building.entity.id +
          "/" +
          row.original.building.id +
          "/" +
          row.original.id;
        return (
          <Link href={url} className="max-w-xs whitespace-normal break-words">
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      accessorKey: "ip",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="IP Address" />
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "downtimeStart",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Down Time Start" />
      ),
      cell: ({ row }) => {
        const timeStart = new Date(row.original.downtimeStart);
        return <div>{timeStart.toString().slice(0, 24)}</div>;
      },
    },
    {
      id: "downDuration",
      accessorFn: (row) => moment(Date.now()).diff(moment(row.downtimeStart)),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Down Time Duration" />
      ),
      cell: ({ row }) => {
        if (!row.original.downtimeStart) return <div>NaN</div>;
        return <DataTableDuration d={row.original.downtimeStart} />;
      },
    },
  ];

  return <AdminDeviceTable columns={columns} data={data} />;
}
