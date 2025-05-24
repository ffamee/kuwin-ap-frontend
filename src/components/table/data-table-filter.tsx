import * as React from "react";
import { Column } from "@tanstack/react-table";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface DataTableFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title: string;
	options: string[];
}

export function DataTableFilter<TData, TValue>({
	column,
	title,
	options,
}: DataTableFilterProps<TData, TValue>) {
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<div className="flex items-center space-x-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="ml-auto h-8 flex">
						{title}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[150px]">
					{options.map((option) => {
						const isSelected = selectedValues.has(option);
						return (
							<DropdownMenuCheckboxItem
								key={option}
								className="capitalize"
								checked={isSelected}
								onCheckedChange={() => {
									if (isSelected) {
										selectedValues.delete(option);
									} else {
										selectedValues.add(option);
									}
									const filterValues = Array.from(selectedValues);
									column?.setFilterValue(
										filterValues.length ? filterValues : undefined
									);
								}}
							>
								{option}
							</DropdownMenuCheckboxItem>
						);
					})}
					{selectedValues.size > 0 && (
						<>
							<Separator className="my-1" />
							<DropdownMenuCheckboxItem
								key="clear"
								onSelect={() => column?.setFilterValue(undefined)}
								className="capitalize justify-center text-center"
							>
								Clear Selection
							</DropdownMenuCheckboxItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
