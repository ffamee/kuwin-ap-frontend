import AdminDeviceTabs from "./admin-device-tab";

async function GetAllAccessPoint() {
  const res = await fetch(`${process.env.BACKEND_URL}/accesspoints`);
  if (!res.ok) {
    throw new Error("fail to fetching GetAllAccessPoint");
  }
  return await res.json();
}

async function GetDownAccessPoint() {
  const res = await fetch(`${process.env.BACKEND_URL}/accesspoints/down`);
  if (!res.ok) {
    throw new Error("fail to fetching GetDownAccessPoint");
  }
  return await res.json();
}

export default async function Page() {
  // const [alldata, downdata] = await Promise.all([
  //   GetAllAccessPoint(),
  //   GetDownAccessPoint(),
  // ]);
  const alldata = await GetAllAccessPoint();
  const downdata = await GetDownAccessPoint();
  return (
    <div className="flex flex-col p-4 gap-4 w-full min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
      <h1>Pro Network Management</h1>
      <AdminDeviceTabs />
    </div>
  );
}
