import { Providers } from "@/components/provider/providers";

export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Providers>{children}</Providers>
		</>
	);
}
