import { Zone } from "@/types/zone-type";
import React from "react";
import ReportForm from "./report-form";
import { notFound } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// function to redirect to /pro after press submit button
	// fetch data of "zone" from localhost:3001/zones to set to zoneList
	// const { zone, faculty, building, accessPoint } = await searchParams;
	const params = await searchParams;

	const fetchData = async () => {
		const res = await fetch("http://localhost:3001/zones", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 900 },
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	};
	const zoneList: Zone[] = await fetchData();
	console.log("Report zone list: ", zoneList);

	// check if zone, faculty, building, accessPoint is string[], send user to error page
	// if (
	// 	(Array.isArray(zone) && zone.length > 1) ||
	// 	(Array.isArray(faculty) && faculty.length > 1) ||
	// 	(Array.isArray(building) && building.length > 1) ||
	// 	(Array.isArray(accessPoint) && accessPoint.length > 1)
	// ) {
	if (
		Array.isArray(params.zone) ||
		Array.isArray(params.faculty) ||
		Array.isArray(params.building) ||
		Array.isArray(params.accessPoint)
	) {
		console.log(
			"Error: Multiple values for zone, faculty, building, or accessPoint"
		);
		return notFound();
	}

	const { zone, faculty, building, accessPoint } = params;
	// check faculty, building, accessPoint must need zone to be selected and so on
	if (accessPoint) {
		if (building) {
			if (faculty) {
				if (!zone) {
					console.log(
						"Error: Zone is required for faculty, building, and accessPoint"
					);
					return notFound();
				}
			} else {
				console.log("Error: Faculty is required for building and accessPoint");
				return notFound();
			}
		} else {
			console.log("Error: Building is required for accessPoint");
			return notFound();
		}
	}
	// validate parameters is an existing one by checking it in backend

	const prefilled = { zone, faculty, building, accessPoint };

	console.log("Prefilled data: ", prefilled);

	return <ReportForm zones={zoneList} prefilled={prefilled} />;
}
