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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { AccessPoint } from "@/types/ap-type";
import { BuildingOverview } from "@/types/building-type";
import {
	Activity,
	CircleAlert,
	Clock,
	Users,
	Wifi,
	WifiOff,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import SummaryCard from "@/components/card/summary-card";

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
	second: "bg-gray-500",
};

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
					color="green-500"
					description="some description"
				/>
				<SummaryCard
					title="Maintain Access Points"
					data={data.apMaintain}
					Icon={CircleAlert}
					color="yellow-500"
					description="some description"
				/>
				<SummaryCard
					title="Down Access Points"
					data={data.apDown}
					Icon={WifiOff}
					color="red-500"
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
												<Card
													className="w-full max-w-[500px] grid! grid-rows-5! gap-4!"
													key={ap.id}
												>
													<CardHeader className="row-span-2">
														<div className="grid grid-cols-4 space-x-2">
															<div className="col-span-3 space-y-1 w-full whitespace-normal break-words">
																<CardTitle className="text-lg/6 tracking-wider">
																	<Link href={`./${buildingId}/${ap.id}`}>
																		{ap.name ?? "-"}
																	</Link>
																</CardTitle>
																<Tooltip>
																	<TooltipTrigger asChild className="w-full">
																		<CardDescription className="text-sm w-auto max-w-full truncate">
																			{ap.location ?? "-"}
																		</CardDescription>
																	</TooltipTrigger>
																	<TooltipContent side="bottom">
																		<p>{ap.location ?? "-"}</p>
																	</TooltipContent>
																</Tooltip>
															</div>
															<div className="flex flex-col items-end-safe pt-2">
																<div
																	className={`w-1/2 max-w-10 h-3 rounded-full ${
																		colorsMap[ap.status]
																	}`}
																></div>
															</div>
														</div>
													</CardHeader>
													<CardContent className="row-span-3">
														<div className="flex flex-col gap-4">
															<div className="grid grid-cols-2">
																<div className="flex flex-col">
																	<div className="text-muted-foreground text-xs">
																		IP Address
																	</div>
																	<div className="text-md font-medium">
																		{ap.ip}
																	</div>
																</div>
																<div className="flex flex-col">
																	<div className="text-muted-foreground text-xs">
																		MAC Address
																	</div>
																	<div className="text-md font-medium uppercase">
																		{ap.ethMac}
																	</div>
																</div>
															</div>
															<div className="grid grid-rows-3 space-y-2">
																<div className="flex flex-row gap-2 text-sm items-baseline">
																	<Users size={14} />
																	<div className="text-muted-foreground align-middle">
																		Connected Users:
																	</div>
																	{Number(ap.numberClient ?? 0) +
																		Number(ap.numberClient_2 ?? 0)}
																</div>
																<div className="flex flex-row gap-2 text-sm items-baseline">
																	<Activity size={14} />
																	<div className="text-muted-foreground align-middle">
																		Bandwidth:
																	</div>
																	{ap.channel} / {ap.channel_2} Mbps
																</div>
																<div className="flex flex-row gap-2 text-sm items-baseline">
																	<Clock size={14} />
																	<div className="text-muted-foreground align-middle">
																		Time:
																	</div>
																	{new Date(ap.timestamp2).toLocaleString()}
																</div>
															</div>
														</div>
													</CardContent>
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
