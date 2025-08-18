import Link from "next/link";

import AdminDeviceTable from "@/components/table/admin-device-table";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { GetAllConfigurations } from "./device-handler";
import { ConfigOverview } from "@/types/config-type";

const data = await GetAllConfigurations();

export default function AdminAllDeviceTable() {
  const columns: ColumnDef<ConfigOverview>[] = [
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
      cell: ({ row }) => {
        if (!row.original.ip.ip) return <div>NaN</div>;
        return row.original.ip.ip;
      },
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      filterFn: (row, columnId, value) => {
        const rowData: string = row.getValue("name");
        if (!row.original.location.name) return false;
        return rowData.toLowerCase().includes(value.toLowerCase());
      },
      cell: ({ row }) => {
        if (!row.original.location.name) return <div>NaN</div>;
        const url = "/monitor";
        return (
          <Link href={url} className="max-w-xs whitespace-normal break-words">
            {row.original.location.name}
          </Link>
        );
      },
    },

    {
      accessorKey: "problem",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Problem" />
      ),
      cell: ({ row }) => {
        return row.original.problem;
      },
    },

    {
      accessorKey: "client24",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client (2.4GHz)" />
      ),
      cell: ({ row }) => {
        if (!row.original.client24) return <div>-</div>;
        return row.original.client24;
      },
    },

    {
      accessorKey: "client5",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client (5GHz)" />
      ),
      cell: ({ row }) => {
        if (!row.original.client5) return <div>-</div>;
        return row.original.client5;
      },
    },

    {
      accessorKey: "client6",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client (6GHz)" />
      ),
      cell: ({ row }) => {
        if (!row.original.client6) return <div>-</div>;
        return row.original.client6;
      },
    },

    // {
    //   id: "totalUser",
    //   accessorFn: (row) =>
    //     Number(row.client24) + Number(row.client5) + Number(row.client6),
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="#User" />
    //   ),
    //   cell: ({ row }) => {
    //     const total =
    //       Number(row.original.client24 ?? 0) +
    //       Number(row.original.client5 ?? 0) +
    //       Number(row.original.client6 ?? 0);
    //     return <div>{total}</div>;
    //   },
    // },
    // {
    //   accessorKey: "wlcActive",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="WLC" />
    //   ),
    //   enableSorting: false,
    // },
  ];

  return <AdminDeviceTable columns={columns} data={data} />;
}
