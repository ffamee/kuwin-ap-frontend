import { notFound } from "next/navigation";
import SectionPage from "./section-page";

export type ApData = {
  id: number;
  name: string;
  apALL: number;
  apMaintain: number;
  apDown: number;
  user1: number;
  user2: number;
};

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

  const entities = await fetch(
    `http://localhost:3001/section/overview/${section}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch data for section: ${section}`);
    }
    return res.json();
  });

  //const summarySection = ...entities{};
  //console.log(...entities);
  console.log("Entities: ", entities);
  return <SectionPage section={section} data={entities} />; // Pass the entities to SectionPage
}
