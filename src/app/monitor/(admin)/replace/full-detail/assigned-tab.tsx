"use client";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import AssignGroup from "./assigned-box";
import { Button } from "@/components/ui/button";

export default function AssignedTab({
	unassigned,
	open,
	setOpen,
}: {
	unassigned: { id: number; model: string }[];
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [valueList, setValueList] = React.useState<
		{ id: number; value: string }[]
	>(unassigned.map((item) => ({ id: item.id, value: "" })));

	const updateValue = (id: number, value: string) => {
		setValueList((prev) =>
			prev.map((item) => (item.id === id ? { ...item, value } : item))
		);
	};

	return open ? (
		<div className="w-full bg-accent/30 rounded-md border-4 border-dashed border-slate-400 p-8 flex flex-col gap-y-4">
			<div className="flex justify-between">
				<div className="flex flex-col gap-y-1">
					<h2 className="text-2xl font-bold flex items-center gap-x-2">
						<Plus onClick={() => setOpen(false)} className="cursor-pointer" />
						Unassigned Models
					</h2>
					<div className="text-sm text-slate-500">
						{
							"New models that haven't been assigned to a group yet. Select a group toassign them."
						}
					</div>
				</div>
				<div className="flex items-center">
					<Button onClick={() => console.log(valueList)}>Submit</Button>
				</div>
			</div>
			{unassigned.length > 0 ? (
				<div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
					{unassigned.map((item) => (
						<AssignGroup
							key={item.id}
							item={item}
							update={updateValue.bind(null, item.id)}
						/>
					))}
				</div>
			) : (
				<div className="bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-2 rounded-md text-slate-500 text-sm border-dotted border-accent-foreground/20 border-3">
					No unassigned models
				</div>
			)}
		</div>
	) : (
		<div
			className="text-xl font-bold flex items-center gap-x-2 cursor-pointer"
			onClick={() => setOpen(true)}
		>
			<Minus size={20} />
			Unassigned Models
			{" ("}
			{unassigned.length}
			{")"}
		</div>
	);
}
