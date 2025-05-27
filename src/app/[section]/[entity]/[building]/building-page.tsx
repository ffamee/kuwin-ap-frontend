"use client";

import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import { ExPieChart } from "@/components/chart/example-pie-chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessPoint } from "@/types/ap-type";
import { BuildingOverview } from "@/types/building-type";
import { CircleAlert, Users, Wifi, WifiOff } from "lucide-react";
import * as React from "react";
import SummaryCard from "@/components/card/summary-card";
import ApOverviewCard from "@/components/card/ap-overview-card";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

export default function BuildingPage({
	buildingId,
	data,
}: {
	buildingId: string;
	data: BuildingOverview & { accesspoints: AccessPoint[] };
}) {
	const [tab, setTab] = React.useState<string>("overview");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleChange = (value: string) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setTab(value);
		}, 300);
	};
	return (
		<div className="flex flex-col gap-4 w-full p-4 min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
			<div className="text-left font-bold capitalize text-6xl my-4">
				{data.name}
			</div>
			<div className="grid grid-cols-4 gap-4">
				<SummaryCard
					title="Total Access Points"
					data={data.apAll}
					Icon={Wifi}
					color="text-green-500"
					description="some description"
				/>
				<SummaryCard
					title="Maintain Access Points"
					data={data.apMaintain}
					Icon={CircleAlert}
					color="text-yellow-400"
					description="some description"
				/>
				<SummaryCard
					title="Down Access Points"
					data={data.apDown}
					Icon={WifiOff}
					color="text-red-500"
				/>
				<SummaryCard
					title="Total Users"
					data={data.totalUser ?? 0}
					Icon={Users}
					description="some description"
				/>
			</div>
			<Tabs value={tab} onValueChange={handleChange} className="w-full">
				<TabsList className="grid w-fit h-fit grid-cols-2 border mb-2">
					<TabsTrigger value="overview" className="text-center">
						Overview
					</TabsTrigger>
					<TabsTrigger value="list" className="text-center">
						List
					</TabsTrigger>
				</TabsList>
				<div>
					{isLoading ? (
						<Skeleton className="w-full h-52" />
					) : (
						<div>
							<TabsContent value="overview">
								<div className="grid grid-cols-3 space-x-4">
									<div>
										<ExPieChart chartData={chartData} />
									</div>
									<div className="col-span-2">
										<ExInteractiveChart />
									</div>
								</div>
							</TabsContent>
							<TabsContent value="list">
								<Card>
									<CardHeader>
										<CardTitle>Access Points</CardTitle>
										<CardDescription>
											Overview of all access points in this building.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
											{data.accesspoints?.map((ap) => (
												<ApOverviewCard
													key={ap.id}
													buildingId={buildingId}
													ap={ap}
												/>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</div>
					)}
				</div>
			</Tabs>
		</div>
	);
}
