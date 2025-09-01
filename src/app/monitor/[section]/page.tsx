import { notFound } from "next/navigation";
import SectionPage from "./section-page";
import fetcher from "@/lib/fetcher";

async function getSectionOverview(section: number) {
  const res = await fetcher(`/section/overview?sec=${section}`);

  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch section ${section}`);
  }
  return await res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const sectionId = Number(section);
  if (isNaN(sectionId) || sectionId <= 0)
    throw new Error("sectionId is not a valid number");

  const data = await getSectionOverview(sectionId);

  return <SectionPage section={sectionId} data={data} />; // Pass the entities to SectionPage
}
