type Lifecycle = {
	id: number;
	group: string;
	eol?: Date;
	eos?: Date;
	pic?: string;
	models: string[];
};

// key of Lifecycle exclude id and group
type ReplaceActionState = {
	success?: boolean;
	errors: {
		[k in Exclude<keyof Lifecycle, "group" | "pic" | "models">]?: boolean;
	};
	message: string;
	payload?: unknown;
};

type LifecycleWithCount = Lifecycle & { count: number };

export type { Lifecycle, ReplaceActionState, LifecycleWithCount };
