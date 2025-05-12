"use client";

import { Zone } from "@/types/zone-type";
import * as React from "react";

import ReportSelect from "@/components/select/report-select";
import { ReportAction } from "./report-action";

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

const ReportForm = ({
	zones,
	prefilled,
}: {
	zones: Zone[];
	prefilled: {
		zone?: string;
		faculty?: string;
		building?: string;
		accessPoint?: string;
	};
}) => {
	const initialState = React.useRef(true);
	const [selectedZone, setSelectedZone] = React.useState<string>(
		prefilled.zone ?? ""
	);
	const [selectedFaculty, setSelectedFaculty] = React.useState<string>(
		prefilled.faculty ?? ""
	);
	const [selectedBuilding, setSelectedBuilding] = React.useState<string>(
		prefilled.building ?? ""
	);
	const [selectedAccessPoint, setSelectedAccessPoint] = React.useState<string>(
		prefilled.accessPoint ?? ""
	);
	// const [reportDetail, setReportDetail] = React.useState<string>("");

	const [error, formAction, isPending] = React.useActionState(
		ReportAction,
		null
	);

	React.useEffect(() => {
		if (!initialState.current) {
			console.log("Selected Zone: ", selectedZone);
			setSelectedFaculty("");
			setSelectedBuilding("");
			setSelectedAccessPoint("");
		}
	}, [selectedZone]);

	React.useEffect(() => {
		if (!initialState.current) {
			console.log("Selected Faculty: ", selectedFaculty);
			setSelectedBuilding("");
			setSelectedAccessPoint("");
		}
	}, [selectedFaculty]);

	React.useEffect(() => {
		if (!initialState.current) {
			console.log("Selected Building: ", selectedBuilding);
			setSelectedAccessPoint("");
		}
	}, [selectedBuilding]);

	React.useEffect(() => {
		if (!initialState.current) {
			console.log("Selected Access Point: ", selectedAccessPoint);
		}
	}, [selectedAccessPoint]);

	React.useEffect(() => {
		initialState.current = false;
	}, []);

	return (
		<div className="flex flex-col items-start justify-start mt-4 px-4 h-auto w-full overflow-y-auto no-scrollbar">
			<h1 className="text-4xl font-bold mb-4">Report Page</h1>
			{/* Add your report form here */}
			<form className="w-full" action={formAction}>
				{/* with tabs for select zone, faculty, building*/}
				<ReportSelect
					type="Zone"
					items={zones}
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
				{error && !selectedAccessPoint && (
					<div className="text-red-500 text-sm mb-4">*{error}</div>
				)}
				<div className="flex justify-center w-full h-auto mb-20">
					<button
						type="submit"
						className="bg-card-foreground/90 hover:bg-card-foreground text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
						disabled={isPending}
					>
						Submit Report
					</button>
				</div>
			</form>
		</div>
	);
};

export default ReportForm;
