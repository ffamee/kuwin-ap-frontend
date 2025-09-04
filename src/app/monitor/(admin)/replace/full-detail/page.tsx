// import fetcher from "@/lib/fetcher";

import FullDetailPage from "./full-detail-page";

async function getUnassignedModel() {
	// const res = await fetcher("/models/unassigned");
	// return res.json();
	return [
		{
			id: 1,
			model: "Unassigned Model 1",
		},
		{
			id: 2,
			model: "Unassigned Model 2",
		},
		{
			id: 3,
			model: "Unassigned Model 3",
		},
		// generated up to id 10
		{
			id: 4,
			model: "Unassigned Model 4",
		},
		{
			id: 5,
			model: "Unassigned Model 5",
		},
		{
			id: 6,
			model: "Unassigned Model 6",
		},
		{
			id: 7,
			model: "Unassigned Model 7",
		},
		{
			id: 8,
			model: "Unassigned Model 8",
		},
		{
			id: 9,
			model: "Unassigned Model 9",
		},
		{
			id: 10,
			model: "Unassigned Model 10",
		},
	];
	// return [];
}

async function getModelDetails() {
	// const res = await fetcher("/models/details");
	// return res.json();
	return [
		{
			id: 1,
			group: "Model 1",
			eol: "2023-12-31",
			eos: "2024-12-31",
			models: ["Model 1A", "Model 1B"],
		},
		{
			id: 2,
			group: "Model 2",
			eol: "2023-12-31",
			models: ["Model 2A", "Model 2B"],
		},
		{
			id: 3,
			group: "Model 3",
			eol: "2023-12-31",
			eos: "2024-12-31",
			models: ["Model 3A", "Model 3B"],
		},
		{
			id: 4,
			group: "Model 4",
			eos: "2024-12-31",
			models: ["Model 4A", "Model 4B"],
		},
	];
}

export default async function Page() {
	const [unassigned, groups] = await Promise.all([
		getUnassignedModel(),
		getModelDetails(),
	]);
	return <FullDetailPage rawUnassigned={unassigned} rawGroups={groups} />;
}
