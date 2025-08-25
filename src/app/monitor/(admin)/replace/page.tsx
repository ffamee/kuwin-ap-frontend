import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditReplacement from "./replace-edit";

export default function Page() {
	return (
		<div className="min-h-0 h-screen overflow-y-auto !scroll-smooth no-scrollbar relative">
			<div className="fixed top-0 w-full">
				<div className="bg-yellow-200 opacity-30 h-14" />
				<div className="group absolute top-1/2 left-1/2 -translate-x-1/2 w-12 h-24">
					<div
						className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2
          bg-accent-foreground text-white rounded-full size-12
          transition-all duration-300
          opacity-0 group-hover:opacity-100 group-hover:translate-y-full hover:scale-110"
					>
						<Link
							href="#title"
							scroll={true}
							className="size-full flex items-center-safe justify-center-safe text-center"
						>
							up
						</Link>
					</div>
				</div>
			</div>
			{/* <div className="fixed bottom-0 w-full">
				<div className="bg-yellow-200 opacity-0 h-14" />
				<div className="group absolute bottom-1/2 left-1/2 -translate-x-1/2 w-12 h-24">
					<div
						className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-accent-foreground text-white rounded-full size-12
          transition-all duration-300
          opacity-0 group-hover:opacity-100 group-hover:-translate-y-full hover:animate-bounce"
					>
						<Link
							href="#display"
							className="size-full flex items-center-safe justify-center-safe text-center"
						>
							down
						</Link>
					</div>
				</div>
			</div> */}
			<div className="p-8 space-y-24">
				<div
					id="title"
					className="flex flex-col justify-center-safe items-center-safe space-y-8 h-auto min-h-screen"
				>
					<div className="text-7xl font-bold w-3/4 text-center">
						KU Access Point Replacement
					</div>
					<div className="text-center text-xl font-semibold">
						Get to know All details about access point in KU
					</div>
					<div className="grid grid-flow-row sm:grid-flow-col gap-4 w-36 sm:w-48 md:w-72 lg:w-96 h-12 mt-6">
						<Button
							variant="link"
							className="bg-accent-foreground w-full text-base text-white h-full"
						>
							<Link
								href="#edit"
								className="size-full flex items-center justify-center"
							>
								Edit
							</Link>
						</Button>
						<Button
							variant="link"
							className="bg-accent-foreground w-full text-base text-white h-full"
						>
							<Link
								href="#display"
								className="size-full flex items-center justify-center"
							>
								Display
							</Link>
						</Button>
					</div>
				</div>
				<div id="edit" className="pb-8">
					<EditReplacement />
				</div>
				<div id="display" className="bg-blue-200 min-h-screen"></div>
			</div>
		</div>
	);
}
