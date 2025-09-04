import { LifecycleProvider } from "@/context/model-group-context";

export default function ReplaceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LifecycleProvider>{children}</LifecycleProvider>
		</>
	);
}
