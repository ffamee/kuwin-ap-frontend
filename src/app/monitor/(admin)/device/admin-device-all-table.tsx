import Link from "next/link";

import AdminDeviceTable from "@/components/table/admin-device-table";

import { ColumnDef } from "@tanstack/react-table";

import { AllApTab } from "@/types/ap-type";

import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { GetAllAccessPoint } from "./device-handler";

const data = await GetAllAccessPoint();

export default function AdminAllDeviceTable() {
  const columns: ColumnDef<AllApTab>[] = [
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
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      enableSorting: false,
      enableColumnFilter: false,
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
      id: "totalUser",
      accessorFn: (row) =>
        Number(row.numberClient) + Number(row.numberClient_2),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total User" />
      ),
      cell: ({ row }) => {
        const total =
          Number(row.original.numberClient) +
          Number(row.original.numberClient_2);
        return <div>{total}</div>;
      },
    },
    {
      accessorKey: "wlcActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="WLC" />
      ),
      enableSorting: false,
    },
  ];

  return <AdminDeviceTable columns={columns} data={data} />;
}
