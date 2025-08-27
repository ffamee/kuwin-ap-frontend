"use client";

import { Separator } from "@/components/ui/separator";
import SelectTable from "./select-table";
import ReplaceBarChart from "./bar-chart";
import * as React from "react";
import { LifecycleWithCount } from "@/types/replace-type";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";

const TopPart = ({ handleSelect }: { handleSelect: (id: number) => void }) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [data, setData] = React.useState<LifecycleWithCount[]>([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const res = await fetcher("/lifecycles/count");
			if (res.ok) {
				setData(await res.json());
				setIsLoading(false);
			} else {
				throw new Error("Failed to fetch data");
			}
		};
		fetchData();
	}, []);

	return (
		<div
			id="top"
			className="grid grid-cols-1 xl:grid-cols-[auto_1fr] h-full w-full gap-4"
		>
			<div
				hidden={isLoading}
				className="rounded-lg py-4 w-full xl:max-w-3xl h-full flex flex-col items-center justify-center font-semibold order-2 xl:order-1"
			>
				<h2 className="mb-2 w-full text-left font-bold text-xl">Model</h2>
				<SelectTable data={data} handleSelect={handleSelect} />
			</div>
			<div
				hidden={!isLoading}
				className="rounded-lg w-full xl:max-w-3xl h-full flex flex-col items-center justify-center gap-2 order-2 xl:order-1"
			>
				<div className="flex flex-row justify-between gap-2 w-full xl:w-3xl">
					<Skeleton className="w-full h-16 rounded-2xl" />
					<Skeleton className="size-16 rounded-full" />
				</div>
				<Skeleton className="w-full xl:w-3xl h-56 rounded-2xl" />
			</div>
			{!isLoading && (
				<div
					// hidden={isLoading}
					className="min-w-full w-full h-full flex items-baseline justify-center py-4 order-1 xl:order-2"
				>
					<ReplaceBarChart data={data} />
				</div>
			)}
			<div
				hidden={!isLoading}
				className="min-w-full w-full h-full flex flex-col justify-center gap-2 md:flex-row order-1 xl:order-2"
			>
				<div className="grid grid-rows-3 w-full h-72 xl:h-full gap-2">
					<Skeleton className="row-span-2 w-full h-full rounded-2xl" />
					<Skeleton className="w-full h-full rounded-2xl" />
				</div>
				<Skeleton className="w-full h-72 xl:h-full rounded-2xl" />
			</div>
		</div>
	);
};

const BottomPart = ({ selected }: { selected: number | null }) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [data, setData] = React.useState<LifecycleWithCount[]>([]);

	React.useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			const res = await fetcher("/lifecycles/count");
			if (res.ok) {
				setData(await res.json());
				setIsLoading(false);
			} else {
				throw new Error("Failed to fetch data");
			}
		};
		fetchData();
	}, []);

	return (
		<div id="bottom" className="min-h-screen flex gap-4">
			{selected ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
					<div
						hidden={isLoading}
						className="rounded-lg w-full h-full flex flex-col items-center font-semibold"
					>
						<h2 className="mb-2 w-full text-left font-bold text-xl">Faculty</h2>
						<SelectTable data={data} handleSelect={() => console.log("hi")} />
					</div>
					<div
						hidden={!isLoading}
						className="rounded-lg w-full flex flex-col items-center gap-2"
					>
						<div className="flex flex-row justify-between gap-2 w-full">
							<Skeleton className="w-full h-16 rounded-2xl" />
							<Skeleton className="size-16 rounded-full" />
						</div>
						<Skeleton className="w-full h-56 rounded-2xl" />
					</div>
					<div
						hidden={isLoading}
						className="rounded-lg w-full h-full flex flex-col items-center font-semibold"
					>
						<h2 className="mb-2 w-full text-left font-bold text-xl">
							Location
						</h2>
						<SelectTable data={data} handleSelect={() => console.log("hi")} />
					</div>
					<div
						hidden={!isLoading}
						className="rounded-lg w-full flex flex-col items-center gap-2"
					>
						<div className="flex flex-row justify-between gap-2 w-full">
							<Skeleton className="w-full h-16 rounded-2xl" />
							<Skeleton className="size-16 rounded-full" />
						</div>
						<Skeleton className="w-full h-56 rounded-2xl" />
					</div>
				</div>
			) : (
				<div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded-2xl">
					No selection made
				</div>
			)}
		</div>
	);
};

export default function DisplayReplacement() {
	const [selected, setSelected] = React.useState<number | null>(null);

	const handleSelect = (id: number) => {
		setSelected(id);
	};

	console.log(selected);
	return (
		<div className="min-h-screen p-8 md:p-16 flex flex-col items-center-safe w-full gap-y-8 ">
			<div className="text-4xl font-bold w-full text-center mt-8">
				MODEL DATA REPORT
			</div>
			<Separator className="bg-accent-foreground mb-4 !w-3/4" />
			<div className="flex flex-col h-full w-full gap-4 flex-1">
				<TopPart handleSelect={handleSelect} />
				<BottomPart selected={selected} key={selected ?? "no-select"} />
			</div>
		</div>
	);
}
