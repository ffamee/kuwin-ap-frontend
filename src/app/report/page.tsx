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
		Array.isArray(params.building) ||
		Array.isArray(params.accessPoint)
	) {
		console.log(
			"Error: Multiple values for section, entity, building, or accessPoint"
		);
		return notFound();
	}

	const { sec, entity, building, accessPoint } = params;
	// check faculty, building, accessPoint must need sec to be selected and so on
	if (
		(accessPoint && (!building || !entity || !sec)) ||
		(building && (!entity || !sec)) ||
		(entity && !sec)
	) {
		console.log(
			"Error: Invalid selection of section, entity, building, or accessPoint"
		);
		return notFound();
	}
	// validate parameters is an existing one by checking it in backend

	const prefilled = { sec, entity, building, accessPoint };

	console.log("Prefilled data: ", prefilled);

	return <ReportForm prefilled={prefilled} />;
}
