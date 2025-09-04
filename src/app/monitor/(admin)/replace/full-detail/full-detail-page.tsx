"use client";
import Username from "@/components/user/username";
import Link from "next/link";
import AssignedTab from "./assigned-tab";
import * as React from "react";
import { Lifecycle } from "@/types/replace-type";
import moment from "moment";
import NoticeBox from "./notice-box";

export default function FullDetailPage({
	rawUnassigned,
	rawGroups,
}: {
	rawUnassigned: { id: number; model: string }[];
	rawGroups: {
		id: number;
		group: string;
		eol?: string;
		eos?: string;
		models: string[];
	}[];
}) {
	const [unassigned, setUnassigned] = React.useState(rawUnassigned);
	const [groups, setGroups] = React.useState<Lifecycle[]>(
		rawGroups.map((group) => ({
			...group,
			eol: group.eol ? moment(group.eol).toDate() : undefined,
			eos: group.eos ? moment(group.eos).toDate() : undefined,
		}))
	);
	const [open, setOpen] = React.useState(true);

	return (
		<div className="min-h-0 h-screen overflow-y-auto !scroll-smooth no-scrollbar relative">
			<div className="fixed top-0 w-full z-10">
				<div className="bg-accent-foreground h-16 flex justify-between items-center px-4">
					<div className="text-white">Access Point Replacement</div>
					<div className="text-white flex gap-4">
						<div className="flex items-center-safe justify-center">
							<Link
								href="#title"
								className="underline-offset-4 hover:underline"
							>
								Home
							</Link>
						</div>
						<NoticeBox unassigned={unassigned.length} setOpen={setOpen} />
						<div className="border-2">
							<Username />
						</div>
					</div>
				</div>
			</div>
			<div className="p-8 space-y-12">
				<div
					id="title"
					className="flex flex-col items-center-safe space-y-8 h-auto pt-24 scroll-mt-24"
				>
					<div className="text-4xl font-bold w-3/4 text-center">
						AP Model Management
					</div>
				</div>
				<div id="assigned" className="w-full scroll-mt-24">
					<AssignedTab unassigned={unassigned} open={open} setOpen={setOpen} />
				</div>
				<div>
					{groups.map((group) => (
						<div
							id={"group" + group.id.toString()}
							key={group.id}
							className="bg-blue-300 h-96 mb-4 scroll-mt-24"
						>
							{group.group}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
