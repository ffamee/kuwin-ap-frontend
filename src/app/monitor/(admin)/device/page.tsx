import AdminDeviceTabs from "./admin-device-tab";

export default async function Page() {
  return (
    <div className="flex flex-col p-4 gap-4 w-full min-h-0 h-screen overflow-y-auto no-scrollbar overscroll-y-contain">
      <h1>Pro Network Management</h1>
      <AdminDeviceTabs />
    </div>
  );
}
