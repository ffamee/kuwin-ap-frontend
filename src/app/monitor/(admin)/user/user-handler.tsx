import fetcher from "@/lib/fetcher";
import { User } from "@/types/user-type";

export async function AddUser(
  userData: Omit<User, "id"> & { password: string }
) {
  const res = await fetcher(`/users/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.status === 409) {
    alert("Username already exists");
    throw new Error("Username already exists");
  } else if (!res.ok) {
    alert("Error");
    throw new Error("Failed to save user");
  } else {
    return res.json();
  }
}

export async function DeleteUser(id: string) {
  const confirmed = confirm("Are you sure to delete this user");
  if (!confirmed) return;
  const res = await fetcher(`/users/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (res.status === 404) {
    alert("User not found");
    throw new Error("User not found");
  } else if (!res.ok) {
    alert("Failed to delete");
    throw new Error("Failed to delete");
  } else {
    alert("Delete Successful");
  }
}

export async function EditUser(data: User) {
  const res = await fetcher(`/users/edit/${data.id}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fetched Error");
  if (res.status === 409) {
    alert("Username already exists");
    throw new Error("Username already exists");
  } else if (res.status === 404) {
    alert("User not found");
    throw new Error("User not found");
  } else if (!res.ok) {
    alert("Failed to submit");
    throw new Error("Failed to submit");
  } else {
    alert("Edit Success");
    return res.json();
  }
}
