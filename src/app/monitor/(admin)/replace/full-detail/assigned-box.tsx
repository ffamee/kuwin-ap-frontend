"use client";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useLifecycle } from "@/context/model-group-context";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

// const frameworks = [
// 	{
// 		value: "next.js",
// 		label: "Next.js",
// 	},
// 	{
// 		value: "sveltekit",
// 		label: "SvelteKit",
// 	},
// 	{
// 		value: "nuxt.js",
// 		label: "Nuxt.js",
// 	},
// 	{
// 		value: "remix",
// 		label: "Remix",
// 	},
// 	{
// 		value: "astro",
// 		label: "Astro",
// 	},
// ];

const ComboBox = ({
	value,
	setValue,
}: {
	value: string;
	setValue: (value: string) => void;
}) => {
	const [openpop, setOpenpop] = React.useState(false);
	const { groups } = useLifecycle();
	// const [value, setValue] = React.useState("");
	return (
		<Popover open={openpop} onOpenChange={setOpenpop}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={openpop}
					className="w-2/5 justify-between truncate text-xs"
				>
					{value
						? groups.find((group) => group.group === value)?.group
						: "Select Group"}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search framework..." className="h-9" />
					<CommandList>
						<CommandEmpty>No group found.</CommandEmpty>
						<CommandGroup>
							{groups.map((group) => (
								<CommandItem
									key={group.id}
									value={group.group}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpenpop(false);
									}}
								>
									{group.group}
									<Check
										className={`ml-auto
										${value === group.group ? " opacity-100" : " opacity-0"}`}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const NameInput = ({
	value,
	setValue,
}: {
	value: string;
	setValue: (value: string) => void;
}) => {
	return (
		<Input
			type="text"
			placeholder="Enter Name"
			className="w-2/5 bg-white"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

interface AssignGroupProps {
	item: { id: number; model: string };
	update: (v: string) => void;
}

export default function AssignGroup({ item, update }: AssignGroupProps) {
	const [mode, setMode] = React.useState(false);
	const [value, setValue] = React.useState("");

	const handleSetValue = (v: string) => {
		setValue(v);
		update(v);
	};

	return (
		<div
			className={`w-full min-w-0 bg-accent border-1 p-4 rounded-md flex flex-col gap-y-2 ${
				!!!value ? "border-accent-foreground/15" : "border-rose-400 border-3"
			}`}
		>
			<div>{item.model}</div>
			<div className="flex justify-between">
				<div className="flex items-center">
					<Switch
						onCheckedChange={() => {
							setMode((prev) => !prev);
							handleSetValue("");
						}}
						checked={mode}
						className="border-accent-foreground/15"
					/>
					<span className="ml-2 text-sm">
						{mode ? "Create new group" : "Assign to group"}
					</span>
				</div>
				{!mode ? (
					<ComboBox value={value} setValue={handleSetValue} />
				) : (
					<NameInput value={value} setValue={handleSetValue} />
				)}
			</div>
		</div>
	);
}
