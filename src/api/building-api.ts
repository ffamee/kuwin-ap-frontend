import { toast } from "sonner";

export async function AddBuilding(buildingData: {
  name: string;
  entityId: number;
  description?: string;
}) {
  console.log(buildingData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildingData),
  });
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
    return null;
  } else {
    // fetched successful
    toast.success(`Building ${buildingData.name} added successfully`);
    return data;
  }
}

export async function DeleteBuilding(buildingId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${buildingId}`,
    {
      method: "DELETE",
    }
  );
  console.log(res.status);
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
  } else {
    toast.success(`Entity with ID ${buildingId} deleted successfully`);
    window.location.reload();
    return res.json();
  }
}

export async function EditBuilding(
  buildingId: number,
  buildingData: { name: string; entityId: number; description?: string }
) {
  console.log(buildingData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/edit/${buildingId}?confirm=true`,
    {
      method: "POST",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingData),
    }
  );
  if (res.status === 404) {
    toast.error("Building with the given ID not found");
  } else if (res.status === 409) {
    toast.error(
      "Building with the given ID has associated buildings and cannot be updated"
    );
  } else {
    toast.success(`Building with ID ${buildingId} updated successfully`);
    console.log(res);
    window.location.reload();
    return res.json();
  }
}
