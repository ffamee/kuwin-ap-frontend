import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	const handleSortToggle = () => {
		if (column.getIsSorted() === "asc") {
			// Default to ascending
			column.toggleSorting(true, true);
		} else if (column.getIsSorted() === "desc") {
			// Ascending to descending
			column.clearSorting();
		} else {
			// Descending to default (unsorted)
			column.toggleSorting(false, true);
		}
	};

	return (
		<div className={cn("flex items-center space-x-2 m-1", className)}>
			<Button
				variant="ghost"
				size="sm"
				className="-ml-4 h-auto data-[state=open]:bg-accent justify-baseline"
				onClick={handleSortToggle}
			>
				<span>{title}</span>
				{/* <ChevronsUpDown /> */}
				<div hidden={column.getIsSorted() === false ? false : true}>
					{/* Chevrons for Sorting */}
					<ChevronsUpDown className={cn("h-3.5 w-3.5")} />
				</div>
				<div
					className="relative flex items-center justify-center w-4"
					hidden={column.getIsSorted() === false}
				>
					<ChevronUp
						className={cn(
							"absolute left-[1] -top-3 transition-opacity h-1.5 w-1.5",
							column.getIsSorted() === "asc" ? "opacity-100" : "opacity-30"
						)}
					/>
					{/* Chevron Down for Descending */}
					<ChevronDown
						className={cn(
							"absolute -top-0.5 left-[1] transition-opacity h-1 w-1",
							column.getIsSorted() === "desc" ? "opacity-100" : "opacity-30"
						)}
					/>
				</div>
			</Button>
		</div>
	);
}
