"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ReportAction(
	prevState: string | null,
	formData: FormData
) {
	console.log("submitting form...");
	const selectedSection = formData.get("Section") as string;
	const selectedEntity = formData.get("Entity") as string;
	const selectedBuilding = formData.get("Building") as string;
	const selectedAccessPoint = formData.get("AccessPoint") as string;
	// const reportDetail = formData.get("reportDetail") as string;

	if (
		selectedSection === "" ||
		selectedEntity === "" ||
		selectedBuilding === "" ||
		selectedAccessPoint === ""
	) {
		return "All fields are required. Please make a selection for each field.";
	}

	console.log("Form submitted");
	console.log("Selected Section: ", selectedSection);
	console.log("Selected Entity: ", selectedEntity);
	console.log("Selected Building: ", selectedBuilding);
	console.log("Selected Access Point: ", selectedAccessPoint);
	// revalidatePath("/report");
	redirect("/");
}
