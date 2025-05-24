import React from "react";
import ReportForm from "./report-form";
import { notFound } from "next/navigation";

export async function getServerSections() {
	const res = await fetch("http://localhost:3001/section", {
		credentials: "include",
		next: { revalidate: 900 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch names.");
	}
	const serverSections = await res.json();
	return serverSections;
}

export async function getServerEntities() {
	const res = await fetch("http://localhost:3001/section/name", {
		credentials: "include",
		next: { revalidate: 900 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch entities.");
	}
	const serverEntities = await res.json();
	return serverEntities;
}

export async function getServerBuildings() {
	const res = await fetch("http://localhost:3001/entities/name", {
		credentials: "include",
		next: { revalidate: 900 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch buildings.");
	}
	const serverBuildings = await res.json();
	return serverBuildings;
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// function to redirect to /pro after press submit button
	// fetch data of "zone" from localhost:3001/zones to set to zoneList
	// const { zone, faculty, building, accessPoint } = await searchParams;
	const params = await searchParams;

	// check if sec, faculty, building, accessPoint is string[], send user to error page
	// if (
	// 	(Array.isArray(sec) && sec.length > 1) ||
	// 	(Array.isArray(entity) && faculty.length > 1) ||
	// 	(Array.isArray(building) && building.length > 1) ||
	// 	(Array.isArray(accessPoint) && accessPoint.length > 1)
	// ) {
	if (
		Array.isArray(params.sec) ||
		Array.isArray(params.entity) ||
		Array.isArray(params.build) ||
		Array.isArray(params.ap)
	) {
		console.log(
			"Error: Multiple values for section, entity, building, or accessPoint"
		);
		return notFound();
	}

	const { sec, entity, build, ap } = params;
	// check faculty, building, accessPoint must need sec to be selected and so on
	if (
		(ap && (!build || !entity || !sec)) ||
		(build && (!entity || !sec)) ||
		(entity && !sec)
	) {
		console.log(
			"Error: Invalid selection of section, entity, building, or accessPoint"
		);
		return notFound();
	}
	// validate parameters is an existing one by checking it in backend

	const prefilled = { sec, entity, build, ap };
	const [sectionsList, entitiesList, buildingsList] = await Promise.all([
		getServerSections(),
		getServerEntities(),
		getServerBuildings(),
	]);
	if (!sectionsList || !entitiesList || !buildingsList) {
		console.log("Error: Failed to fetch data");
		throw new Error("Failed to fetch data");
	}

	// console.log("Prefilled data: ", prefilled);

	return (
		<ReportForm
			prefilled={prefilled}
			sections={sectionsList}
			entities={entitiesList}
			buildings={buildingsList}
		/>
	);
}
