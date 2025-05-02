// import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { Zone } from "@/types/zone-type";
import Link from "next/link";

type List = Zone & { url: string };

type NavZoneProps = {
	show: () => void;
	hide: () => void;
	// list: {
	// 	title: string;
	// 	url: string;
	// 	icon: React.ForwardRefExoticComponent<
	// 		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	// 	>;
	// 	isActive: boolean;
	// 	items: {
	// 		title: string;
	// 		url: string;
	// 	}[];
	// };
	list: List[];
};

export default function NavZone(props: NavZoneProps) {
	const [paginatedItems, setPaginatedItems] = React.useState<List[]>(
		props.list ?? []
	); // Items to display on the current page

	// write function for search input to filter the items in the list
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		const filteredItems = props.list.filter((item: List) =>
			item.area.toLowerCase().includes(value)
		);
		setPaginatedItems(filteredItems);
	};

	return (
		<div
			className="absolute left-14 z-10 top-28 h-80 flex flex-col p-2 w-48 gap-1 bg-accent rounded-sm border-slate-200 border-2"
			onMouseEnter={props.show}
			onMouseLeave={props.hide}
		>
			<input
				type="text"
				placeholder="Search..."
				className="px-2 py-1 w-full border-slate-200 border-2 rounded-sm bg-background"
				onChange={handleChange}
			/>
			<Separator className="my-1 bg-slate-300" />
			<div className="overflow-y-auto no-scrollbar">
				{paginatedItems.map((item: List) => (
					<div
						key={item.id}
						className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md w-full mb-1"
					>
						<Link href={item.url} className="truncate pl-2" title={item.area}>
							{item.area}
						</Link>
						<Separator className="my-1" />
					</div>
				))}
			</div>
		</div>
	);
}
