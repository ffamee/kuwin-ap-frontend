import { Zone } from "@/types/zone-type";
import React from "react";
import ReportForm from "./report-form";

export default async function Page() {
	// function to redirect to /pro after press submit button
	// fetch data of "zone" from localhost:3001/zones to set to zoneList
	const fetchData = async () => {
		const res = await fetch("http://localhost:3001/zones", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	};
	const zoneList: Zone[] = await fetchData();
	console.log("Report zone list: ", zoneList);

	return <ReportForm zones={zoneList} />;
}
