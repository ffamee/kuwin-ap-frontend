export default async function Page({
	params,
}: {
	params: Promise<{ ap: string }>;
}) {
	const { ap } = await params;
	return <div>access points page: {ap}</div>;
}
