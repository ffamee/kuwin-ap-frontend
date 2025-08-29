export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// User who accesses the admin section should have admin privileges
	return (
		<div className="min-w-full h-full min-h-0 transition-[width,height] ease-linear overflow-auto no-scrollbar">
			{children}
		</div>
	);
}
