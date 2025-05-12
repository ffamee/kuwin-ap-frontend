"use server";

import { redirect } from "next/navigation";

export async function ReportAction(
	prevState: string | null,
	formData: FormData
) {
	console.log("submitting form...");
	const selectedZone = formData.get("Zone") as string;
	const selectedFaculty = formData.get("Faculty") as string;
	const selectedBuilding = formData.get("Building") as string;
	const selectedAccessPoint = formData.get("AccessPoint") as string;
	// const reportDetail = formData.get("reportDetail") as string;

	if (
		selectedZone === "" ||
		selectedFaculty === "" ||
		selectedBuilding === "" ||
		selectedAccessPoint === ""
	) {
		return "All fields are required. Please make a selection for each field.";
	}

	console.log("Form submitted");
	console.log("Selected Zone: ", selectedZone);
	console.log("Selected Faculty: ", selectedFaculty);
	console.log("Selected Building: ", selectedBuilding);
	console.log("Selected Access Point: ", selectedAccessPoint);
	redirect("/pro");
}
