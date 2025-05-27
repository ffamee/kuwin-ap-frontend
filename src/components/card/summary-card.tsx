"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface SummaryCardProps {
	title: string;
	data: number;
	color?: string;
	Icon?: LucideIcon;
	description?: string;
}

export default function SummaryCard({
	title,
	data,
	color = "gray-500",
	Icon,
	description,
}: SummaryCardProps) {
	return (
		<Card className="w-full grid grid-rows-5! gap-2!">
			<CardHeader className="row-span-2 text-lg">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="row-span-3">
				<div className="flex flex-col gap-2">
					<div
						className={`${
							description && Icon
								? "text-2xl"
								: description || Icon
								? "text-3xl"
								: "text-4xl"
						} text-2xl font-semibold flex flex-row gap-4`}
					>
						{Icon && (
							<span className="flex items-center">
								<Icon size={24} className={`text-${color}`} />
							</span>
						)}
						<div>{data}</div>
					</div>
					{description && <CardDescription>{description}</CardDescription>}
				</div>
			</CardContent>
		</Card>
	);
}
