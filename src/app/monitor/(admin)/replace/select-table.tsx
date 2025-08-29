import { formatDate } from "@/components/date-picker/format-date";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { ReplaceSelectTable } from "@/components/table/replace-select-table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { LifecycleWithCount } from "@/types/replace-type";
import { ColumnDef } from "@tanstack/react-table";
import { Info, SquarePen } from "lucide-react";
import Link from "next/link";

const SelectTable = ({
	data,
	handleSelect,
}: {
	data: LifecycleWithCount[];
	handleSelect: (id: number) => void;
}) => {
	const columns: ColumnDef<LifecycleWithCount>[] = [
		{
			accessorKey: "group",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Group" />
			),
			filterFn: (row, _columnId, value) => {
				const rowData: string = row.getValue("group");
				return rowData.toLowerCase().includes(value.toLowerCase());
			},
			cell: ({ row }) => {
				const url = "#bottom";
				return (
					<Link
						href={url}
						className="max-w-xs whitespace-normal break-words capitalize"
						onClick={() => handleSelect(row.original.id)}
					>
						{row.getValue("group")}
					</Link>
				);
			},
		},
		{
			id: "eol",
			accessorFn: (row) => {
				if (!row.eol) return new Date();
				return new Date(row.eol);
			},
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="End of Life" />
			),
			cell: ({ row }) => {
				if (!row.original.eol) return <div className="ml-10">-</div>;
				return <div className="">{formatDate(row.original.eol)}</div>;
			},
		},
		{
			id: "eos",
			accessorFn: (row) => {
				if (!row.eos) return new Date();
				return new Date(row.eos);
			},
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="End of Service" />
			),
			cell: ({ row }) => {
				if (!row.original.eos) return <div className="ml-10">-</div>;
				return <div className="px-2">{formatDate(row.original.eos)}</div>;
			},
		},
		{
			accessorKey: "count",
			accessorFn: (row) => row.count,
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Amount" />
			),
			cell: ({ row }) => {
				return <div className="px-6">{row.getValue("count")}</div>;
			},
		},
		{
			id: "action",
			cell: ({ row }) => {
				return (
					<div className="mt-1 flex items-baseline-last justify-evenly space-x-2">
						<Tooltip>
							<TooltipTrigger>
								<Link href={`./replace?edit=${row.original.id}#edit`}>
									<SquarePen size={14} />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger>
								<Link href={`./replace/full-detail#${row.original.id}`}>
									<Info size={14} />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Full detail</p>
							</TooltipContent>
						</Tooltip>
					</div>
				);
			},
		},
	];

	return <ReplaceSelectTable columns={columns} data={data} />;
};

export default SelectTable;
