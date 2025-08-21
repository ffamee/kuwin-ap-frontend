// import ConfirmationDelete from "@/components/modal/confirmation-delete";
import { toast } from "sonner";

export async function AddBuilding(buildingData: {
  name: string;
  entityId: number;
  description?: string;
}) {
  console.log(buildingData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingData),
    }
  );
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
  confirmMessage?: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${buildingId}${confirmMessage}`,
    {
      method: "DELETE",
    }
  );
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/edit/${buildingId}${confirmMessage}`,
    {
      method: "POST",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingData),
    }
  );
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
