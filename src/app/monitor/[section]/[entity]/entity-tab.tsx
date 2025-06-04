"use client";

import React from "react";

// import { SectionTable } from "@/components/table/section-table";
import { ExAreaChart } from "@/components/chart/example-area-chart";
import { ExBarChart } from "@/components/chart/example-bar-chart";
//import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import { BuildingCard } from "@/components/card/building-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { BuildingOverview } from "@/types/building-type";

const chartData1 = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartData2 = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

export default function EntityTab({
	buildings,
	accessPoints,
	entityId,
}: {
	buildings: BuildingOverview[];
	accessPoints: [];
	entityId: string;
}) {
	const [tab, setTab] = React.useState<string>("list");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleChange = (value: string) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setTab(value);
		}, 300);
	};

	return (
		<Tabs value={tab} onValueChange={handleChange} className="w-full space-y-1">
			<TabsList className="grid w-fit h-fit  grid-cols-2 border">
				<TabsTrigger value="list" className="text-center">
					List
				</TabsTrigger>
				<TabsTrigger value="overview" className="text-center">
					Overview
				</TabsTrigger>
			</TabsList>
			<div>
				{isLoading ? (
					<Skeleton className="w-full h-52" />
				) : (
					<div>
						<TabsContent value="overview" className="grid grid-cols-2">
							<ExAreaChart chartData={chartData1} />
							<ExBarChart chartData={chartData2} />
						</TabsContent>
						<TabsContent value="list" className="space-y-1">
							{buildings.map((b: BuildingOverview) => (
								<BuildingCard
									key={b.id}
									entityId={entityId}
									building={b}
									accessPoints={accessPoints[b.id]}
								/>
							))}
						</TabsContent>
					</div>
				)}
			</div>
		</Tabs>
	);
}
