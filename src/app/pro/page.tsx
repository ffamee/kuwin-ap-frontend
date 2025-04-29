import OverAllGraph from "../../image/userZone1to7.png";
import Image from "next/image";
import Link from "next/link";
import { ZoneData } from "./zone-interface";
import { DataTable } from "@/components/table/data-table";
import GetData from "./getdata";
import SummaryTable from "./summarytable";

const headTable = [
  { accessorKey: "zone", header: "Faculty/Organization" },
  { accessorKey: "all", header: "# AP (overall)" },
  { accessorKey: "maintain", header: "# AP (maintain)" },
  { accessorKey: "down", header: "# AP (down)" },
  { accessorKey: "c24", header: "# Client (2.4GHz)" },
  { accessorKey: "c50", header: "# Client (5.0GHz)" },
];

const date: Date = new Date();

export default async function Page() {
  const zone: ZoneData[] = await GetData();
  const Total: ZoneData = {
    zone: "",
    all: 0,
    maintain: 0,
    down: 0,
    c24: 0,
    c50: 0,
  };
  for (const i of zone) {
    Total.all += i.all;
    Total.maintain += i.maintain;
    Total.down += i.down;
    Total.c24 += i.c24;
    Total.c50 += i.c50;
  }
  return (
    <div className="bg-[#FFFEEA] font-sans flex flex-col items-center justify-center p-9 h-auto w-full pb-28">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Overall Status Access Point
      </h1>
      <p className="text-right p-4">{date.toISOString().slice(0, 19)}</p>

      <SummaryTable total={Total} />
      <figure className="min-w-[1080] min-h-[439] mx-4 bg-white border my-2 w-full">
        <p className="p-2">
          <Link href="">Daily</Link> | <Link href="">Weekly</Link> |{" "}
          <Link href="">Monthly</Link>
        </p>
        <Image
          src={OverAllGraph}
          width={979}
          height={326}
          alt="overall graph"
          className="bottom-250 left-50 p-2"
        />
      </figure>
      <DataTable column={headTable} data={zone} />
    </div>
  );
}
