"use client";

import { Zone } from "@/types/zone-type";
import { useRouter } from "next/navigation";
import * as React from "react";

import ReportSelect from "@/components/select/report-select";

const Faculties = [
	{
		id: 1,
		area: "Faculty of Science",
	},
	{
		id: 2,
		area: "Faculty of Engineering",
	},
	{
		id: 3,
		area: "Faculty of Arts",
	},
];
const Buildings = [
	{
		id: 1,
		area: "Building A",
	},
	{
		id: 2,
		area: "Building B",
	},
	{
		id: 3,
		area: "Building C",
	},
];
const AccessPoints = [
	{
		id: 1,
		area: "Access Point 1",
	},
	{
		id: 2,
		area: "Access Point 2",
	},
	{
		id: 3,
		area: "Access Point 3",
	},
];

const ReportForm = ({ zoneList }: { zoneList: Zone[] }) => {
	const [selectedZone, setSelectedZone] = React.useState<string>("");
	const [selectedFaculty, setSelectedFaculty] = React.useState<string>("");
	const [selectedBuilding, setSelectedBuilding] = React.useState<string>("");
	const [selectedAccessPoint, setSelectedAccessPoint] =
		React.useState<string>("");
	// const [reportDetail, setReportDetail] = React.useState<string>("");
	const [error, setError] = React.useState<string | null>(null);
	const router = useRouter();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			selectedZone === "" ||
			selectedFaculty === "" ||
			selectedBuilding === "" ||
			selectedAccessPoint === ""
		) {
			setError(
				"All fields are required. Please make a selection for each field."
			);
			return;
		}
		console.log("Form submitted");
		console.log("Selected Zone: ", selectedZone);
		console.log("Selected Faculty: ", selectedFaculty);
		console.log("Selected Building: ", selectedBuilding);
		console.log("Selected Access Point: ", selectedAccessPoint);
		router.push("/pro");
	};

	React.useEffect(() => {
		console.log("Selected Zone: ", selectedZone);
		setSelectedFaculty("");
		setSelectedBuilding("");
		setSelectedAccessPoint("");
	}, [selectedZone]);

	React.useEffect(() => {
		console.log("Selected Faculty: ", selectedFaculty);
		setSelectedBuilding("");
		setSelectedAccessPoint("");
	}, [selectedFaculty]);

	React.useEffect(() => {
		console.log("Selected Building: ", selectedBuilding);
		setSelectedAccessPoint("");
	}, [selectedBuilding]);

	React.useEffect(() => {
		console.log("Selected Access Point: ", selectedAccessPoint);
	}, [selectedAccessPoint]);

	return (
		<div className="flex flex-col items-start justify-start mt-4 px-4 h-auto w-full overflow-y-auto no-scrollbar">
			<h1 className="text-4xl font-bold mb-4">Report Page</h1>
			{/* Add your report form here */}
			<form className="w-full" onSubmit={handleSubmit}>
				{/* with tabs for select zone, faculty, building*/}
				<ReportSelect
					type="Zone"
					items={zoneList}
					value={selectedZone}
					set={setSelectedZone}
				/>
				<ReportSelect
					type="Faculty"
					items={Faculties}
					value={selectedFaculty}
					set={setSelectedFaculty}
					disabled={!selectedZone}
				/>
				<ReportSelect
					type="Building"
					items={Buildings}
					value={selectedBuilding}
					set={setSelectedBuilding}
					disabled={!selectedFaculty}
				/>
				<ReportSelect
					type="AccessPoint"
					items={AccessPoints}
					value={selectedAccessPoint}
					set={setSelectedAccessPoint}
					disabled={!selectedBuilding}
				/>
				{/*text area for report detail */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="reportDetail"
					>
						Report Detail
					</label>
					<textarea
						id="reportDetail"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-scrollbar"
						rows={4}
						placeholder="Enter report details..."
					></textarea>
				</div>
				{error && <div className="text-red-500 text-sm mb-4">*{error}</div>}
				{/* submit button and send to /pro after press*/}
				{/* make the button full width */}
				<div className="flex justify-center w-full h-auto mb-20">
					<button
						type="submit"
						className="bg-card-foreground/90 hover:bg-card-foreground text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit Report
					</button>
				</div>
			</form>
		</div>
	);
};

export default ReportForm;
