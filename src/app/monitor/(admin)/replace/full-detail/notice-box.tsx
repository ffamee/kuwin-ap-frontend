"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Inbox } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function NoticeBox({
	unassigned,
	setOpen,
}: {
	unassigned: number;
	setOpen: (open: boolean) => void;
}) {
	const [notice, setNotice] = React.useState(false);
	return (
		<div className="relative border-2 rounded-sm h-full w-full p-1 flex items-center justify-center">
			<AlertDialog defaultOpen={unassigned > 0}>
				<AlertDialogTrigger
					asChild
					className={!notice ? "pointer-events-none" : ""}
				>
					<div>
						<Inbox className="size-5" />
						{notice && (
							<div className="bg-red-500 rounded-full w-3 h-3 absolute top-0 right-0 transition-all translate-x-1/2 -translate-y-1/3" />
						)}
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Unassigned Models</AlertDialogTitle>
						<AlertDialogDescription>
							{unassigned} models are unassigned
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => {
								setNotice(unassigned > 0);
								setOpen(false);
							}}
						>
							Remind me later
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Link
								href="#assigned"
								onClick={() => {
									setNotice(unassigned > 0);
									setOpen(true);
								}}
							>
								Assign now
							</Link>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
