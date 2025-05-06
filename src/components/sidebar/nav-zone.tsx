// import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { Zone } from "@/types/zone-type";
import Link from "next/link";
import { Search, SearchX } from "lucide-react";

type List = Zone & { url: string };

type NavZoneProps = {
	show: () => void;
	hide: () => void;
	list: List[];
};

export default function NavZone(props: NavZoneProps) {
	const [zoneList, setzoneList] = React.useState<List[]>(props.list ?? []); // Items to display on the current page

	// write function for search input to filter the items in the list
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		const filteredItems = props.list.filter((item: List) =>
			item.area.toLowerCase().includes(value)
		);
		setzoneList(filteredItems);
	};

	return (
		<div className="h-full w-full bg-black/40 absolute z-10">
			<div
				className="relative left-14 top-28 h-auto max-h-3/5 flex flex-col w-2/5 min-w-80 bg-white rounded-sm border-slate-200 border-2"
				onMouseEnter={props.show}
				onMouseLeave={props.hide}
			>
				<div className="flex items-center gap-0.5 p-2">
					<Search size={20} />
					<input
						type="text"
						placeholder="Search..."
						className="px-2 py-1 w-full rounded-sm bg-background focus:outline-none"
						onChange={handleChange}
					/>
				</div>
				<Separator className="mb-3 bg-slate-300" />
				{zoneList.length !== 0 ? (
					<div>
						<p className="mx-2 font-semibold text-sm">zone</p>
						<div className="overflow-y-auto no-scrollbar flex flex-col p-2">
							{zoneList.map((item: List) => (
								// <div key={item.id} className="truncate mx-1">
								<Link
									href={item.url}
									className="rounded-md hover:bg-slate-100 truncate py-2 pl-1"
									title={item.area}
									key={item.id}
								>
									{item.area}
								</Link>
								// </div>
							))}
						</div>
					</div>
				) : (
					<div className="h-60 flex flex-col items-center justify-center gap-2 text-2xl text-gray-500">
						<SearchX size={80} className="text-gray-400" />
						Not found
					</div>
				)}
			</div>
		</div>
	);
}
