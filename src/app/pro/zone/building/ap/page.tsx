import Image from "next/image";
import ApImage from "./ap-underconstruct.gif";
import { DataTable } from "@/components/table/data-table";
import { ApData } from "../../faculty-interface";
import GetZoneData from "../../getZonedata";
import { Apcount } from "../apcount";

const headTable = [
  { accessorKey: "bool", header: "Status" },
  { accessorKey: "location", header: "Location of Access Point" },
  { accessorKey: "problem", header: "Problem" },
  { accessorKey: "c24", header: "#Client (2.4GHz)" },
  { accessorKey: "c50", header: "#Client (5.0GHz)" },
  { accessorKey: "cmax", header: "#Client (active) max" },
  { accessorKey: "apjoin", header: "AP Join" },
  { accessorKey: "wlc", header: "WLC" },
];

export default async function Page() {
  const zone: ApData[] = await GetZoneData();
  const apSum = await Apcount();
  zone.forEach((element) => {
    element.maintain = apSum.maintain;
    element.down = apSum.down;
    element.all = apSum.maintain + apSum.down;

    // these are temporary for displaying in the page's table
    element.cmax = 50;
  });
  return (
    <div className="bg-[#FFFEEA] font-sans h-screen">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Access Point
      </h1>
      <Image
        src={ApImage}
        width={339}
        height={258}
        alt="Picture of access point"
      />
      <DataTable column={headTable} data={zone} />
    </div>
  );
}
