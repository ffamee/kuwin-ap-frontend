import { notFound } from "next/navigation";
import UserManageTable from "./admin-user-table";

async function GetUserData() {
  const res = await fetch(`http://localhost:3001/users`);
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return await res.json();
}

export default async function Page() {
  const usersData = await GetUserData();
  // console.log(usersData);

  return (
    <div>
      <h1>User Management Page</h1>
      <UserManageTable data={usersData} />
    </div>
  );
}
