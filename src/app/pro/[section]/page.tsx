import { DataTable } from "@/components/table/data-table";
import { notFound } from "next/navigation";

type ApData = {
  status: boolean;
  location: string;
  building: string;
  all: number;
  maintain: number;
  down: number;
  c24: number;
  c50: number;
  cmax: number;
  wlc: number;
};

const getZoneData = async () => {
  const res = await fetch(
    "https://67f4bef5cbef97f40d2f310d.mockapi.io/api/apData"
  );
  if (!res.ok) {
    console.log("Fetch Data error");
    return notFound();
  }
  return await res.json();
};

async function Apcount() {
  const ap: ApData[] = await getZoneData();
  let maintain: number = 0;
  let down: number = 0;
  ap.forEach((overap) => {
    if (overap.status == true) {
      maintain += 1;
    } else {
      down += 1;
    }
  });
  return { maintain, down };
}

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
  const zoneData: ApData[] = await getZoneData();
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
