import { DataTable } from "@/components/table/data-table";
import GetData from "./getdata";
import { ZoneData } from "./zone-interface";

const headTable = [
  { accessorKey: "zone", header: "Faculty/Organization" },
  { accessorKey: "all", header: "# AP (overall)" },
  { accessorKey: "maintain", header: "# AP (maintain)" },
  { accessorKey: "down", header: "# AP (down)" },
  { accessorKey: "c24", header: "# Client (2.4GHz)" },
  { accessorKey: "c50", header: "# Client (5.0GHz)" },
];

export default async function ProTable() {
  const zone: ZoneData[] = await GetData();
  return <DataTable column={headTable} data={zone} />;
}
