"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import moment from "moment";
import { useDebounce } from "@/hooks/use-debounce";

const possibleFormats = [
	// Common formats
	"MMM D, YY",
	"MMM D, YYYY",
	"MMM DD, YY",
	"MMM DD, YYYY",
	"MMMM D, YY",
	"MMMM D, YYYY",
	"MMMM DD, YY",
	"MMMM DD, YYYY",
	"D MM YY",
	"D MM YYYY",
	"D MMM YY",
	"D MMM YYYY",
	"D MMMM YY",
	"D MMMM YYYY",
	"DD MM YY",
	"DD MM YYYY",
	"DD MMM YY",
	"DD MMM YYYY",
	"DD MMMM YY",
	"DD MMMM YYYY",
	"MMM D YY",
	"MMM D YYYY",
	"MMM DD YY",
	"MMM DD YYYY",
	"MMMM D YY",
	"MMMM D YYYY",
	"MMMM DD YY",
	"MMMM DD YYYY",
	"D/M/YY",
	"D/M/YYYY",
	"D/MM/YY",
	"D/MM/YYYY",
	"D/MMM/YY",
	"D/MMM/YYYY",
	"D/MMMM/YY",
	"D/MMMM/YYYY",
	"DD/M/YY",
	"DD/M/YYYY",
	"DD/MM/YY",
	"DD/MM/YYYY",
	"DD/MMM/YY",
	"DD/MMM/YYYY",
	"DD/MMMM/YY",
	"DD/MMMM/YYYY",
	"M/D/YY",
	"M/D/YYYY",
	"MM/D/YY",
	"MM/D/YYYY",
	"MMM/D/YY",
	"MMM/D/YYYY",
	"MMMM/D/YY",
	"MMMM/D/YYYY",
	"M/DD/YY",
	"M/DD/YYYY",
	"MM/DD/YY",
	"MM/DD/YYYY",
	"MMM/DD/YY",
	"MMM/DD/YYYY",
	"MMMM/DD/YY",
	"MMMM/DD/YYYY",
];

function formatDate(date: Date | undefined) {
	if (!date) {
		return "";
	}

	const d = moment(date);
	if (!d.isValid()) {
		return "";
	}
	return d.format("MMM D, YYYY");
}

function isValidDate(date: string | undefined) {
	if (!date) {
		return false;
	}
	return moment(date, possibleFormats).isValid();
}

export function DateInput({
	label,
	initialDate,
}: {
	label?: string;
	initialDate?: Date;
}) {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(
		initialDate ?? new Date()
	);
	const [month, setMonth] = React.useState<Date | undefined>(
		initialDate ?? new Date()
	);
	const [value, setValue] = React.useState(formatDate(date ?? new Date()));

	const debounce = useDebounce(value, 1000);

	React.useEffect(() => {
		console.log("Debounced value:", debounce);
		if (isValidDate(debounce)) {
			const d = moment(debounce, possibleFormats).toDate();
			setDate(d);
			setMonth(d);
			setValue(formatDate(d));
		}
	}, [debounce]);

	return (
		<div className="flex flex-col gap-3">
			{label}
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={value}
					placeholder={formatDate(new Date())}
					className="bg-background pr-10"
					onChange={(e) => {
						setValue(e.target.value);
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(date) => {
								setDate(date);
								setValue(formatDate(date));
								setOpen(false);
							}}
							startMonth={new Date(new Date().getFullYear() - 101, 11)}
							endMonth={new Date(new Date().getFullYear() + 101, 0)}
							hidden={(date) => {
								return (
									date > new Date(new Date().getFullYear() + 100, 11, 31) ||
									date < new Date(new Date().getFullYear() - 100, 0)
								);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
