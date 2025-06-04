import { notFound } from "next/navigation";
import SectionPage from "./section-page";

async function getSectionOverview(section: string) {
	const res = await fetch(
		`http://localhost:3001/section/overview?sec=${section}`
	);
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

	const data = await getSectionOverview(section);

	return <SectionPage section={section} data={data} />; // Pass the entities to SectionPage
}
