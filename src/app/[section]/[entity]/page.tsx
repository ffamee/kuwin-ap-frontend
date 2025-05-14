import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ entity: string }>;
}) {
	const { entity } = await params;
	return <div>Entity page : {entity}</div>;
}
