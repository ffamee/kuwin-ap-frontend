export default async function Page({
	params,
}: {
	params: Promise<{ zone: string }>;
}) {
	const { zone } = await params;
	return (
		<div className="flex flex-col items-center justify-center p-9 h-auto w-full pb-28">
			<h1 className="text-4xl font-bold">Hello, World!</h1>
			<p className="my-4 text-lg">Welcome to my Zone {zone} Page!!!!!</p>
		</div>
	);
}
