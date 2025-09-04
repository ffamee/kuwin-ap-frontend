"use client";

import fetcher from "@/lib/fetcher";
import { Lifecycle } from "@/types/replace-type";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface LifecycleContextType {
	groups: Lifecycle[];
	setGroups: React.Dispatch<React.SetStateAction<Lifecycle[]>>;
}

const LifecycleContext = createContext<LifecycleContextType>({
	groups: [],
	setGroups: () => {},
});

export function LifecycleProvider({ children }: { children: ReactNode }) {
	const [groups, setGroups] = useState<Lifecycle[]>([]);

	const fetchData = async () => {
		try {
			const res = await fetcher("/lifecycles", {
				credentials: "include",
			});
			if (res.ok) {
				const data: Lifecycle[] = await res.json();
				// sort the groups with eol or eos equal null first
				// data.sort((a, b) => {
				// 	if (!a.eol && !a.eos && !b.eol && !b.eos) return a.id - b.id;
				// 	if (!a.eol && !a.eos) return -1;
				// 	if (!b.eol && !b.eos) return 1;
				// 	if ((!a.eol || !a.eos) && (!b.eol || !b.eos)) return a.id - b.id;
				// 	if (!a.eol || !a.eos) return -1;
				// 	if (!b.eol || !b.eos) return 1;
				// 	return a.id - b.id;
				// });
				setGroups(data);
			} else throw new Error("Failed to fetch lifecycles");
		} catch (error) {
			throw new Error("Error fetching lifecycle data", { cause: error });
		}
	};

	useEffect(() => {
		console.log("get lifecycle data");
		fetchData();
	}, []);

	return (
		<LifecycleContext.Provider value={{ groups, setGroups }}>
			{children}
		</LifecycleContext.Provider>
	);
}

export function useLifecycle() {
	return useContext(LifecycleContext);
}
