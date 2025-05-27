import BuildingPage from "./building-page";

export default async function Page({
	params,
}: {
	params: Promise<{ building: string }>;
}) {
	const { building } = await params;
	const data = await fetch(
		`http://localhost:3001/buildings/overview/${building}`
	)
		.then((res) => res.json())
		.catch((error) => {
			console.error("Error fetching building data:", error);
			throw new Error("Failed to fetch building data");
		});

	return <BuildingPage data={data} />;
}
