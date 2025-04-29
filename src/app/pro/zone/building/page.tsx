import { DataTable } from "@/components/table/data-table";
import { ApData } from "../faculty-interface";
import GetZoneData from "../getZonedata";
import { Apcount } from "./apcount";

const headTable = [
  { accessorKey: "building", header: "Building" },
  { accessorKey: "all", header: "#AP (overall)" },
  { accessorKey: "maintain", header: "#AP maintain" },
  { accessorKey: "down", header: "#AP (down)" },
  { accessorKey: "c24", header: "Client (2.4GHz)" },
  { accessorKey: "c50", header: "#Client (5GHz)" },
  { accessorKey: "cmax", header: "#Client (max)" },
  { accessorKey: "wlc", header: "#WLC" },
];

export default async function Page() {
  const zone: ApData[] = await GetZoneData();
  const apSum = await Apcount();
  zone.forEach((element, index: number) => {
    element.maintain = apSum.maintain;
    element.down = apSum.down;
    element.all = apSum.maintain + apSum.down;

    // these are temporary for displaying in the page's table
    element.cmax = 50;
    element.building = "building" + index.toString();
  });
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-left font-bold m-4 text-[48px] italic">Building</h1>
      <DataTable column={headTable} data={zone} />
    </div>
  );
}
