import { LifecycleBarChart } from "@/components/chart/lifecycle-bar-chart";
import { LifecycleWithCount } from "@/types/replace-type";

const ReplaceBarChart = ({ data }: { data: LifecycleWithCount[] }) => {
	return (
		<div className="grid grid-cols-1 gap-4 w-full h-full max-h-full items-stretch md:grid-cols-2">
			<LifecycleBarChart chartData={data} type={"eol"} />
			<LifecycleBarChart chartData={data} type={"eos"} />
		</div>
	);
};

export default ReplaceBarChart;
