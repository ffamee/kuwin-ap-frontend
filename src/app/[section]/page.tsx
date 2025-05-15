import { notFound } from "next/navigation";
import SectionPage from "./section-page";

export type ApData = {
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

// const getZoneData = async () => {
//   const res = await fetch(
//     "https://67f4bef5cbef97f40d2f310d.mockapi.io/api/apData"
//   );
//   if (!res.ok) {
//     console.log("Fetch Data error");
//     return notFound();
//   }
//   return await res.json();
// };

// async function Apcount() {
//   const ap: ApData[] = await getZoneData();
//   let maintain: number = 0;
//   let down: number = 0;
//   ap.forEach((overap) => {
//     if (overap.status == true) {
//       maintain += 1;
//     } else {
//       down += 1;
//     }
//   });
//   return { maintain, down };
// }

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (["faculty", "organization", "dormitory"].includes(section) == false) {
    console.log("Error: Invalid section");
    return notFound();
  }

  //const zoneData: ApData[] = await getZoneData();
  //   const apSum = await Apcount();
  //   zoneData.forEach((element) => {
  //     element.maintain = apSum.maintain;
  //     element.down = apSum.down;
  //     element.all = apSum.maintain + apSum.down;
  //   });
  // return (
  // 	<div className="bg-[#FFFEEA] font-sans w-full">
  // 		<h1 className="text-left font-bold m-4 text-[48px] italic">
  // 			Zone ที่ {section} ในมหาวิทยาลัยเกษตรศาสตร์
  // 		</h1>
  // 		<div className="w-full">
  // 			{<DataTable column={headTable} data={zoneData} />}
  // 		</div>
  // 	</div>
  // );

  const entities = await fetch(
    `http://localhost:3001/entities/${section}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch data for section: ${section}`);
    }
    return res.json();
  });
  console.log("Entities: ", entities);
  // return <SectionPage section={section} data={entities} />;
  return <SectionPage section={section} data={entities} />; // Pass the zoneData to SectionPage
}
