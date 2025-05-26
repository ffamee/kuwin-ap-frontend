"use client";

import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import { ExPieChart } from "@/components/chart/example-pie-chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { AccessPoint } from "@/types/ap-type";
import { BuildingOverview } from "@/types/building-type";
import * as React from "react";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const colorsMap: Record<string, string> = {
	up: "bg-green-500",
	down: "bg-red-500",
	ma: "bg-yellow-500",
	rOff: "bg-cyan-500",
};

export default function BuildingPage({
	data,
}: {
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
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Total Access Points</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{data.apAll}</p>
					</CardContent>
				</Card>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Maintain Access Points</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{data.apMaintain}</p>
					</CardContent>
				</Card>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Down Access Points</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{data.apDown}</p>
					</CardContent>
				</Card>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Total Users</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{data.totalUser}</p>
					</CardContent>
				</Card>
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
											{data.accesspoints.map((ap) => (
												<Card className="w-full max-w-[500px]" key={ap.id}>
													<CardHeader className="grid grid-cols-4 space-x-2">
														<div className="col-span-3 space-y-1 w-full whitespace-normal break-words line-clamp-3">
															<CardTitle>{ap.name ?? "-"}</CardTitle>
															<Tooltip>
																<TooltipTrigger asChild>
																	<CardDescription title={ap.location}>
																		{ap.location ?? "-"}
																	</CardDescription>
																</TooltipTrigger>
																<TooltipContent>
																	<p>{ap.location ?? "-"}</p>
																</TooltipContent>
															</Tooltip>
														</div>
														<div className="flex flex-col items-end-safe">
															<div
																className={`w-9/12 h-3 rounded-full ${
																	colorsMap[ap.status]
																}`}
															></div>
														</div>
													</CardHeader>
													<CardContent>
														<p>Card Content</p>
													</CardContent>
													<CardFooter>
														<p>Card Footer</p>
													</CardFooter>
												</Card>
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
