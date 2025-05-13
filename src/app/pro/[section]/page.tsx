import { DataTable } from "@/components/table/data-table";
import { ApData } from "../zone/faculty-interface";
import GetZoneData from "../zone/getZonedata";
import { Apcount } from "../zone/building/apcount";

const headTable = [
  { accessorKey: "location", header: "Faculty" },
  { accessorKey: "all", header: "# AP (overall)" },
  { accessorKey: "maintain", header: "# AP (maintain)" },
  { accessorKey: "down", header: "# AP (down)" },
  { accessorKey: "c24", header: "# Client (2.4GHz)" },
  { accessorKey: "c50", header: "# Client (5.0GHz)" },
  { accessorKey: "wlc", header: "# WLC" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const zoneData: ApData[] = await GetZoneData();
  const apSum = await Apcount();
  zoneData.forEach((element) => {
    element.maintain = apSum.maintain;
    element.down = apSum.down;
    element.all = apSum.maintain + apSum.down;
  });
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Zone ที่ {section} ในมหาวิทยาลัยเกษตรศาสตร์
      </h1>
      {<DataTable column={headTable} data={zoneData} />}
    </div>
  );
}
