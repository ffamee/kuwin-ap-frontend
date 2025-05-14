// import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { CircleX, Search, SearchX } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Entity } from "@/types/entity-type";

// type List = Zone & { url: string };

type NavZoneProps = {
	lists: Entity[][];
	close: (b: boolean) => void;
};

export default function NavZone(props: NavZoneProps) {
	const [faculties, setFaculties] = React.useState<Entity[]>(
		props.lists[0] ?? []
	);
	const [organizations, setOrganizations] = React.useState<Entity[]>(
		props.lists[1] ?? []
	);
	const [dormitories, setDormitories] = React.useState<Entity[]>(
		props.lists[2] ?? []
	);
	const { state } = useSidebar();

	// write function for search input to filter the items in the list
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		const [filteredFaculties, filteredOrganizations, filteredDormitories] =
			await Promise.all([
				new Promise<Entity[]>((resolve) => {
					const filteredFaculties = props.lists[0].filter((item: Entity) =>
						item.name.toLowerCase().includes(value)
					);
					resolve(filteredFaculties);
				}),
				new Promise<Entity[]>((resolve) => {
					const filteredOrganizations = props.lists[1].filter((item: Entity) =>
						item.name.toLowerCase().includes(value)
					);
					resolve(filteredOrganizations);
				}),
				new Promise<Entity[]>((resolve) => {
					const filteredDormitories = props.lists[2].filter((item: Entity) =>
						item.name.toLowerCase().includes(value)
					);
					resolve(filteredDormitories);
				}),
			]);
		// console.log("Filtered faculties: ", filteredFaculties);
		// console.log("Filtered organizations: ", filteredOrganizations);
		// console.log("Filtered dormitories: ", filteredDormitories);
		setFaculties(filteredFaculties);
		setOrganizations(filteredOrganizations);
		setDormitories(filteredDormitories);
	};

	React.useEffect(() => {
		// Add event listener for clicks outside the search tab
		document.addEventListener("mousedown", (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest(".search-tab")) {
				props.close(false);
			}
		});
		return () => {
			// Clean up the event listener
			document.removeEventListener("mousedown", (e: MouseEvent) => {
				const target = e.target as HTMLElement;
				if (!target.closest(".search-tab")) {
					props.close(false);
				}
			});
		};
	}, [props]);

	return (
		<div className="relative">
			<div
				className={`z-1 bg-black/30 fixed inset-0 ${
					state === "expanded" ? "left-(--sidebar-width)" : "left-12"
				} top-12 transition-all duration-300 ease-in-out`}
			/>
			<div
				className={`absolute z-10 top-2 right-0 bg-white rounded-sm border-slate-200 border-2 shadow-lg search-tab`}
			>
				<div className="relative h-auto max-h-3/5 flex flex-col w-sm sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-2xl">
					<div className="absolute justify-end-safe flex right-0 p-1">
						<CircleX
							className="size-4 text-white"
							fill="red"
							onClick={() => props.close(false)}
						/>
					</div>
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
					{faculties.length === 0 &&
					organizations.length === 0 &&
					dormitories.length === 0 ? (
						<div className="h-60 flex flex-col items-center justify-center gap-2 text-2xl text-gray-500">
							<SearchX size={80} className="text-gray-400" />
							Not found
						</div>
					) : (
						<div className="h-auto max-h-96 overflow-y-auto no-scrollbar">
							<p
								className={`mx-2 font-semibold text-sm ${
									faculties.length ? "" : "opacity-50"
								}`}
							>
								Faculty
							</p>
							<div className="overflow-y-auto no-scrollbar flex flex-col p-2">
								{faculties.map((item: Entity) => (
									<Link
										href={`/${item.section.secType}/${item.id}`}
										className="rounded-md hover:bg-slate-100 truncate py-2 pl-2"
										title={item.name}
										key={item.id}
										onClick={() => props.close(false)}
									>
										{item.name}
									</Link>
								))}
							</div>
							<p
								className={`mx-2 font-semibold text-sm ${
									organizations.length ? "" : "opacity-50"
								}`}
							>
								Organization
							</p>
							<div className="overflow-y-auto no-scrollbar flex flex-col p-2">
								{organizations.map((item: Entity) => (
									<Link
										href={`/${item.section.secType}/${item.id}`}
										className="rounded-md hover:bg-slate-100 truncate py-2 pl-2"
										title={item.name}
										key={item.id}
										onClick={() => props.close(false)}
									>
										{item.name}
									</Link>
								))}
							</div>
							<p
								className={`mx-2 font-semibold text-sm ${
									dormitories.length ? "" : "opacity-50"
								}`}
							>
								Dormitory
							</p>
							<div className="overflow-y-auto no-scrollbar flex flex-col p-2">
								{dormitories.map((item: Entity) => (
									<Link
										href={`/${item.section.secType}/${item.id}`}
										className="rounded-md hover:bg-slate-100 truncate py-2 pl-2"
										title={item.name}
										key={item.id}
										onClick={() => props.close(false)}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
