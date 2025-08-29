"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { LifecycleWithCount } from "@/types/replace-type";
import moment from "moment";
import { ChevronDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import * as React from "react";

const chartConfig = {
	yearMonth: {
		label: "yearMonth",
	},
	count: {
		label: "Count",
	},
} satisfies ChartConfig;

export function LifecycleBarChart({
	type,
	chartData,
}: {
	type: "eol" | "eos";
	chartData: LifecycleWithCount[];
}) {
	const [open, setOpen] = React.useState<boolean>(false);

	const dataMap = new Map<
		number,
		{ yearMonth: number; [group: string]: number }
	>();
	const name = new Set<string>();
	const years = new Set<number>();

	// Use a single loop to process the data
	chartData.forEach((curr) => {
		if (!curr[type]) return;

		// Calculate moment object only once
		const m = moment(curr[type]);
		const yearMonth = m.startOf("month").valueOf();
		const yearStart = m.startOf("year").valueOf();

		// Store the group name and year
		name.add(curr.group);
		years.add(yearStart);

		// Get the data entry or create a new one if it doesn't exist
		let entry = dataMap.get(yearMonth);
		if (!entry) {
			entry = { yearMonth };
			dataMap.set(yearMonth, entry);
		}

		// Add the count to the entry
		entry[curr.group] = curr.count;
	});

	// Convert the Map values to an array and sort
	const arrayData = Array.from(dataMap.values()).sort(
		(a, b) => a.yearMonth - b.yearMonth
	);

	// Convert the Set to an array for rendering
	const groupNames = Array.from(name);
	const yearTicks = Array.from(years);

	const monthRange = () => {
		if (!arrayData.length) return "";
		const start = moment(arrayData[0].yearMonth).startOf("month");
		const end = moment(arrayData[arrayData.length - 1].yearMonth).endOf(
			"month"
		);
		if (start.year() !== end.year())
			return `${start.format("MMMM YYYY")} - ${end.format("MMMM YYYY")}`;
		return `${start.format("MMMM")} - ${end.format("MMMM YYYY")}`;
	};

	return (
		<Card
			className={`${
				open ? "h-full" : "h-min"
			} transform transition-all duration-300 ease-in-out`}
		>
			<CardHeader className="relative">
				<CardTitle className="text-lg">
					{type === "eol" ? "End of Life" : "End of Service"}
				</CardTitle>
				<CardDescription>{monthRange()}</CardDescription>
				<div className="absolute right-4 top-0">
					<Tooltip>
						<TooltipTrigger asChild>
							<Info className="size-4 text-gray-400" />
						</TooltipTrigger>
						<TooltipContent className="break-words w-32" side="left">
							<p>This chart shows the lifecycle stages of the product.</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</CardHeader>
			<CardContent
				className={`${
					open ? "h-full" : "h-min"
				} transition-all duration-300 ease-in-out overflow-hidden`}
			>
				<ChartContainer
					config={chartConfig}
					className={`w-full h-full ${
						open ? "" : "min-h-[200px]"
					} overflow-hidden`}
				>
					<BarChart accessibilityLayer data={arrayData}>
						<CartesianGrid vertical={false} />
						<YAxis
							hide
							domain={[0, (dataMax: number) => Math.max(dataMax + 100, 100)]}
						/>
						<XAxis
							dataKey="yearMonth"
							scale="time"
							type="number"
							domain={[
								(dataMin: number) => moment(dataMin).startOf("year").valueOf(),
								(dataMax: number) => moment(dataMax).endOf("year").valueOf(),
							]}
							ticks={yearTicks}
							axisLine={false}
							tickFormatter={(value) => moment(value).format("YYYY")}
							padding={{ left: 20, right: 20 }}
							interval={0}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelKey="yearMonth"
									labelFormatter={(value, payload) => {
										const [data] = payload;
										if ("payload" in data)
											return moment(data.payload[value]).format("MMM YYYY");
										return "";
									}}
								/>
							}
						/>
						{open && <ChartLegend />}
						{groupNames.map((n, i) => (
							<Bar
								key={n}
								dataKey={n}
								fill={`var(--chart-${(i % 10) + 1})`}
								stackId="a"
							/>
						))}
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex justify-end">
				<ChevronDown
					className={`size-6 text-gray-500 transition-all duration-300 ease-in-out ${
						open ? "rotate-180" : ""
					}`}
					onClick={() => setOpen(!open)}
				/>
			</CardFooter>
		</Card>
	);
}
