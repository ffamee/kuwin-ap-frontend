export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// User who accesses the admin section should have admin privileges
	return <div>{children}</div>;
}
