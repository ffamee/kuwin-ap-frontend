import { ApData } from "./faculty-interface";
import { DataTable } from "@/components/table/data-table";
import GetZoneData from "./getZonedata";
import { Apcount } from "./building/apcount";
//import { Apcount } from "./building/apcount";

const headTable = [
  { accessorKey: "location", header: "Faculty/Organization" },
  { accessorKey: "all", header: "# AP (overall)" },
  { accessorKey: "maintain", header: "# AP (maintain)" },
  { accessorKey: "down", header: "# AP (down)" },
  { accessorKey: "c24", header: "# Client (2.4GHz)" },
  { accessorKey: "c50", header: "# Client (5.0GHz)" },
  { accessorKey: "wlc", header: "# WLC" },
];

const z = 2;

export default async function Page() {
  const zone: ApData[] = await GetZoneData();
  const apSum = await Apcount();
  zone.forEach((element) => {
    element.maintain = apSum.maintain;
    element.down = apSum.down;
    element.all = apSum.maintain + apSum.down;
  });
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Zone ที่ {z} ในมหาวิทยาลัยเกษตรศาสตร์
      </h1>
      <DataTable column={headTable} data={zone} />
    </div>
  );
}
