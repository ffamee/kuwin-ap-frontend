export default async function Page({
  params,
}: {
  params: Promise<{ building: string }>;
}) {
  const { building } = await params;

  return (
    <div>
      <h1>hello building {building}</h1>
    </div>
  );
}
