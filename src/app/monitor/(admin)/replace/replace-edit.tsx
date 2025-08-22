"use client";

import { DateInput } from "@/components/date-picker/date-input";
import DragAndDrop from "@/components/file-upload/drag-n-drop";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import Image from "next/image";
import * as React from "react";

type Lifecycle = {
	id: number;
	group: string;
	eol?: Date;
	eos?: Date;
	pic?: string;
	models: string[];
};

export default function EditReplacement() {
	const [groups, setGroups] = React.useState<Lifecycle[]>([]);
	const [selected, setSelected] = React.useState<number | null>(null);

	React.useEffect(() => {
		// Fetch lifecycle data from an API or other source
		const fetchData = async () => {
			// const response = await fetch("/api/lifecycle");
			// const data: Lifecycle[] = await response.json();
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
			const data: Lifecycle[] = [
				{
					id: 1,
					group: "Group A",
					eol: new Date("2024-12-31"),
					eos: new Date("2025-12-31"),
					models: ["Model A1", "Model A2"],
				},
				{ id: 2, group: "Group B", models: [] },
				{
					id: 3,
					group: "Group C",
					eol: new Date("2023-06-30"),
					models: ["Model C1", "Model C2", "Model C3"],
				},
				{ id: 4, group: "Group D", eos: new Date("2025-01-01"), models: [] },
			];
			// sort the groups with eol or eos equal null first
			data.sort((a, b) => {
				if (!a.eol && !a.eos && !b.eol && !b.eos) return a.id - b.id;
				if (!a.eol && !a.eos) return -1;
				if (!b.eol && !b.eos) return 1;
				if ((!a.eol || !a.eos) && (!b.eol || !b.eos)) return a.id - b.id;
				if (!a.eol || !a.eos) return -1;
				if (!b.eol || !b.eos) return 1;
				return a.id - b.id;
			});
			setGroups(data);
			console.log("Lifecycle data fetched:", data);
		};
		fetchData();
	}, []);

	return (
		<div className="min-h-screen p-8 md:p-16 flex flex-col items-center-safe w-full gap-y-8">
			<div className="text-4xl font-bold w-full text-center mt-8">
				EDIT ACCESSPOINT EOL/EOS
			</div>
			<Separator className="bg-accent-foreground mb-8 !w-3/4" />
			<div
				key={selected}
				className="h-auto min-h-full flex flex-col md:flex-row justify-between gap-8 w-full"
			>
				<div className="min-h-full h-auto w-full bg-accent flex flex-col gap-4 p-4 rounded-lg md:rounded-2xl">
					<div className="text-2xl font-semibold text-left mb-4">
						Accesspoint Details
					</div>
					<Select
						defaultValue={selected?.toString() ?? undefined}
						onValueChange={(val) => setSelected(parseInt(val))}
					>
						<SelectTrigger className="w-1/2 bg-white">
							<SelectValue placeholder="Select a Model" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectGroup>
								<SelectLabel>Model</SelectLabel>
								{groups.map((group) => (
									<SelectItem key={group.id} value={group.id.toString()}>
										<div>{group.group}</div>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<DateInput
						label="End of Life"
						initialDate={groups.find((group) => group.id === selected)?.eol}
					/>
					<DateInput
						label="End of Service"
						initialDate={groups.find((group) => group.id === selected)?.eos}
					/>
					<DragAndDrop />
					<div className="w-full h-auto mt-8 flex justify-end">
						{/* Submit button */}
						<Button variant="default">Save</Button>
					</div>
					{/* Form content goes here */}
				</div>
				<div className="min-h-full h-auto bg-cyan-200 w-full">
					{/** group detail */}
					<div className="text-xl font-semibold">Group Details</div>
					{/* Display only selected group */}
					{selected ? (
						<div className="mt-4">
							{groups
								.filter((group) => group.id === selected)
								.map((group, index) => (
									<div key={index} className="p-4 bg-white rounded-lg shadow">
										<div className="text-lg font-semibold">{group.group}</div>
										{group.pic ? (
											<Image
												src={group.pic}
												alt={group.group}
												width={100}
												height={100}
											/>
										) : (
											<p>No image available</p>
										)}
										{group.eol && (
											<p>
												End of Life: {moment(group.eol).format("MMM D, YYYY")}
											</p>
										)}
										{group.eos && (
											<p>
												End of Service:{" "}
												{moment(group.eos).format("MMM D, YYYY")}
											</p>
										)}
										{group.models.length > 0 ? (
											<p>Models: {group.models.join(", ")}</p>
										) : (
											<p>No models available for this group.</p>
										)}
									</div>
								))}
						</div>
					) : (
						<div>No group selected</div>
					)}
				</div>
			</div>
		</div>
	);
}
