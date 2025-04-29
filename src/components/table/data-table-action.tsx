import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

import { Row } from "@tanstack/react-table";

export default function DataTableAction<T extends object>({
	row,
}: {
	row: Row<T>;
}) {
	// const handleRow = () => {
	// 	const data = Object.assign({}, row.original) as Payment;
	// 	if (data.email) {
	// 		navigator.clipboard.writeText(data.email);
	// 	} else throw new Error("Email not found");
	// };
	console.log("row: ", row.original);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				{/* <DropdownMenuItem onClick={handleRow}>Copy Email</DropdownMenuItem> */}
				<DropdownMenuItem>Copy Email</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
