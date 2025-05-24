"use client";

import * as React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface selectProps {
	type: "Section" | "Entity" | "Building" | "AccessPoint";
	items: {
		id: number;
		name: string;
	}[];
	value: string;
	set: (val: string) => void;
	disabled?: boolean;
}

const ReportSelect = (props: selectProps) => {
	const [open, setOpen] = React.useState(false);
	const [focus, setFocus] = React.useState(false);

	const handleOpen = () => {
		if (props.disabled) {
			setFocus(true);
		} else {
			setFocus(false);
			setOpen((prev) => !prev);
		}
	};

	React.useEffect(() => {
		if (!props.disabled) {
			setFocus(false);
		}
	}, [props.disabled]);

	return (
		<div className="mb-4 w-full max-w-full">
			<label
				className="block text-gray-700 text-sm font-bold mb-2"
				htmlFor={props.type}
			>
				{props.type}
			</label>
			<input type="hidden" name={props.type} value={props.value ?? ""} />
			<div className="w-full">
				<Select
					// name={props.type}
					value={props.value}
					onValueChange={(value) => {
						props.set(value);
					}}
					open={open}
					onOpenChange={handleOpen}
				>
					<SelectTrigger
						className="w-[calc(100vw-300px)] min-w-full text-md shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline truncate capitalize"
						id={props.type}
					>
						<SelectValue placeholder={`Select ${props.type}`} />
					</SelectTrigger>
					{/*make content of select items not going out of Select tabs size*/}
					<SelectContent className="">
						<SelectGroup className="w-[calc(100vw-300px)] min-w-full truncate capitalize">
							<SelectLabel>{props.type}</SelectLabel>
							{/* map zoneList to SelectItem */}
							{props.items &&
								props.items.length &&
								props.items.map((item) => (
									<SelectItem
										key={item.id}
										value={item.id.toString()}
										title={item.name}
										className=""
									>
										<div className="w-full truncate capitalize">
											{item.name}
										</div>
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{focus && props.disabled && (
					<div className="text-red-500 text-sm mt-1">
						*Previous selection needed
					</div>
				)}
			</div>
		</div>
	);
};

export default ReportSelect;
