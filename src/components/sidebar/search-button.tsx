"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import NavZone from "./nav-zone";
import { Zone } from "@/types/zone-type";

export default function SearchButton({ zoneList }: { zoneList: Zone[] }) {
	const [showSearch, setShowSearch] = React.useState<boolean>(false);

	const handleSearchClick = () => {
		setShowSearch((prev) => !prev);
	};

	const items = zoneList.map((item) => {
		return {
			...item,
			url: `/pro/${item.id}`,
		};
	});

	return (
		<div>
			<Button
				variant={"ghost"}
				className="size-10 border border-accent hover:border-accent-foreground"
				onClick={handleSearchClick}
				aria-label="Search"
				title="Search"
			>
				<Search className="size-5" />
			</Button>
			{showSearch && <NavZone list={items} close={setShowSearch} />}
		</div>
	);
}
