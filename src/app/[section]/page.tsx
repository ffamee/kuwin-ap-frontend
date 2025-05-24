import { notFound } from "next/navigation";
import SectionPage from "./section-page";

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

	const data = await fetch(
		`http://localhost:3001/section/overview/${section}`
	).then((res) => {
		if (!res.ok) {
			throw new Error(`Failed to fetch data for section: ${section}`);
		}
		return res.json();
	});

	return <SectionPage section={section} data={data} />;
}
