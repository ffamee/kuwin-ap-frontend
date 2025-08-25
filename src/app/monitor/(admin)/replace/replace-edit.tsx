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
import Form from "next/form";
import * as React from "react";
import ReplaceEditAction from "@/lib/actions/replace-edit-action";
import fetcher from "@/lib/fetcher";
import { toast } from "sonner";
import { formatDate } from "@/components/date-picker/format-date";

type Lifecycle = {
	id: number;
	group: string;
	eol?: Date;
	eos?: Date;
	pic?: string;
	models: string[];
};

// key of Lifecycle exclude id and group
export type ActionState = {
	success?: boolean;
	errors: {
		[k in Exclude<keyof Lifecycle, "group" | "pic" | "models">]?: boolean;
	};
	message: string;
	payload?: unknown;
};

const initialState: ActionState = {
	errors: {
		id: false,
		eol: false,
		eos: false,
	},
	message: "",
};

export default function EditReplacement() {
	const [groups, setGroups] = React.useState<Lifecycle[]>([]);
	const [selected, setSelected] = React.useState<number | null>(null);
	const fileRef = React.useRef<{
		getFile: () => File | null;
	} | null>(null);

	React.useEffect(() => {
		// Fetch lifecycle data from an API or other source
		const fetchData = async () => {
			const res = await fetcher("/lifecycles", { credentials: "include" });
			if (res.ok) {
				const data: Lifecycle[] = await res.json();
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
			} else throw new Error("Failed to fetch lifecycles");
		};
		fetchData();
	}, []);

	// extend formAction to append file into formData
	// const actionWithBoundData = ReplaceEditAction.bind(
	// 	null,
	// 	fileRef?.current?.getFile() || null
	// );
	const wrapperAction = async (prev: ActionState, formData: FormData) => {
		const file = fileRef?.current?.getFile() || null;
		if (file) formData.set("pic", file);
		formData.set("id", selected ? selected.toString() : "");
		return ReplaceEditAction(prev, formData);
	};

	const [state, formAction, isPending] = React.useActionState(
		wrapperAction,
		initialState
	);

	React.useEffect(() => {
		console.log("Form action state changed:", state);
		if (state.success && state.payload)
			setGroups((prev) =>
				prev.map((group) =>
					group.id === Number(state.payload.id)
						? { ...group, ...state.payload, id: Number(state.payload.id) }
						: group
				)
			);
		if (state.success) toast.success(state.message);
		else if (!!state.message) toast.error(state.message);
	}, [state]);

	const updateDiff = (date: Date) => {
		const now = moment();
		const target = moment(date);

		if (now < target) {
			const years = target.diff(now, "years");
			const months = target.diff(now, "months");
			const days = target.diff(now, "days");

			// case now < target
			if (years > 0) {
				return `in ${years} years`;
			} else if (months > 0) {
				return `in ${months} months`;
			} else {
				return `in ${days} days`;
			}
		} else {
			const years = now.diff(target, "years");
			const months = now.diff(target, "months");
			const days = now.diff(target, "days");

			if (years > 0) {
				return `${years} years ago`;
			} else if (months > 0) {
				return `${months} months ago`;
			} else {
				return `${days} days ago`;
			}
		}
	};

	const selectedGroup = groups.find((group) => group.id === selected);

	return (
		<div className="min-h-screen p-8 md:p-16 flex flex-col items-center-safe w-full gap-y-8">
			<div className="text-4xl font-bold w-full text-center mt-8">
				EDIT MODEL EOL/EOS
			</div>
			<Separator className="bg-accent-foreground mb-4 !w-3/4" />
			<div
				key={selected}
				className="h-auto min-h-full flex flex-col md:flex-row justify-between gap-8 w-full"
			>
				<Form
					action={formAction}
					className="min-h-full h-auto w-full bg-accent flex flex-col gap-4 p-4 rounded-lg md:rounded-2xl"
				>
					<div className="text-2xl font-semibold text-left mb-4">
						Model Details
					</div>
					<div>
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
						{state.errors.id && (
							<div className="text-red-500 text-sm">* Group is required</div>
						)}
					</div>
					<div>
						<DateInput
							name="eol"
							label="End of Life"
							initialDate={groups.find((group) => group.id === selected)?.eol}
						/>
						{state.errors.eol && (
							<div className="text-red-500 text-sm">
								* End of Life is required
							</div>
						)}
					</div>
					<div>
						<DateInput
							name="eos"
							label="End of Service"
							initialDate={groups.find((group) => group.id === selected)?.eos}
						/>
						{state.errors.eos && (
							<div className="text-red-500 text-sm">
								* End of Service is required
							</div>
						)}
					</div>
					{/* <DragAndDrop name="pic" file={file} setFile={setFile} /> */}
					<DragAndDrop name="pic" ref={fileRef} />
					<div className="w-full h-auto mt-8 flex justify-end">
						<Button
							key="submit"
							type="submit"
							value="submit"
							variant="default"
							className={`${
								isPending
									? "!cursor-wait pointer-events-auto opacity-50"
									: "cursor-pointer"
							}`}
							// disabled={isPending}
						>
							Save
						</Button>
					</div>
				</Form>
				{selectedGroup ? (
					<div className="p-4 bg-white rounded-lg shadow space-y-4 min-h-full h-auto max-h-full w-full md:rounded-2xl">
						<div className="text-lg font-bold">{selectedGroup.group}</div>

						{/* Image with loading state and fallback */}
						<div className="w-full aspect-[16/9] relative flex items-center-safe animate-pulse-bg">
							<Image
								src={
									selectedGroup.pic
										? `http://localhost:3001/${selectedGroup.pic}`
										: "/image.png"
								}
								className="object-contain"
								alt={selectedGroup.group}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								loading="lazy"
							/>
						</div>
						<div>
							<p className="font-semibold">End of Life:</p>
							{selectedGroup.eol ? (
								<p className="ml-2">
									{formatDate(selectedGroup.eol)} (
									{updateDiff(selectedGroup.eol)})
								</p>
							) : (
								<p className="ml-2 text-gray-500">Not set</p>
							)}
						</div>

						<div>
							<p className="font-semibold">End of Service:</p>
							{selectedGroup.eos ? (
								<p className="ml-2">
									{formatDate(selectedGroup.eos)} (
									{updateDiff(selectedGroup.eos)})
								</p>
							) : (
								<p className="ml-2 text-gray-500">Not set</p>
							)}
						</div>
						<div className="pt-2 border-t">
							<p className="font-semibold">Models:</p>
							{selectedGroup.models.length > 0 ? (
								<p className="ml-2">{selectedGroup.models.join(", ")}</p>
							) : (
								<p className="ml-2 text-gray-500">
									No models available for this group.
								</p>
							)}
						</div>
					</div>
				) : (
					<div className="text-center text-gray-500 mt-8 w-full">
						Please select a group to view details.
					</div>
				)}
			</div>
		</div>
	);
}
