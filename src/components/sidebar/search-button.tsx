"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import NavZone from "./nav-zone";
import { Entity } from "@/types/entity-type";

export default function SearchButton({
	lists,
}: {
	lists: { faculty: Entity[]; organization: Entity[]; dormitory: Entity[] };
}) {
	const [showSearch, setShowSearch] = React.useState<boolean>(false);

	const handleSearchClick = () => {
		setShowSearch((prev) => !prev);
	};

	// const items = lists.map((list) => {
	// 	return {
	// 		...item,
	// 		url: `/pro/${item.id}`,
	// 	};
	// });

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
			{showSearch && <NavZone lists={lists} close={setShowSearch} />}
		</div>
	);
}
