import fetcher from "@/lib/fetcher";
import { toast } from "sonner";

export async function AddBuilding(buildingData: {
  name: string;
  entityId: number;
  description?: string;
}) {
  console.log(buildingData);
  const res = await fetcher(`/buildings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildingData),
  });
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return null;
  } else {
    // fetched successful
    toast.success(`Building ${buildingData.name} added successfully`);
    return data;
  }
}

export async function DeleteBuilding(
  buildingId: number,
  confirmMessage: string
) {
  const res = await fetcher(`/buildings/${buildingId}${confirmMessage}`, {
    method: "DELETE",
  });
  console.log(res.status);
  const data = await res.json();
  if ("statusCode" in data) {
    if (data.statusCode === 409) return data;
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return data;
  } else {
    toast.success(`Entity with ID ${buildingId} deleted successfully`);
    return data;
  }
}

export async function EditBuilding(
  buildingId: number,
  buildingData: { name: string; entityId: number; description?: string },
  confirmMessage?: string
) {
  console.log(buildingData);
  const res = await fetcher(`/buildings/edit/${buildingId}${confirmMessage}`, {
    method: "POST",
    // credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildingData),
  });
  if (res.status === 409) {
    console.log(res.statusText);
  }
  const data = await res.json();
  if ("statusCode" in data) {
    if (data.statusCode === 409) return data;
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return data;
  } else {
    toast.success(`Entity with ID ${buildingId} edited successfully`);
    return data;
  }
}
