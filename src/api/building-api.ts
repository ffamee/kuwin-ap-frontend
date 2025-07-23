import { toast } from "sonner";

export async function AddBuilding(buildingData: {
  name: string;
  entityId: number;
  // description: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`, {
    method: "POST",
    // credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildingData),
  });
  if (res.status === 400) {
    toast.error("File type not matched with jpeg, png, or gif");
  } else if (res.status === 404) {
    toast.error("Entity with the given ID not found");
  } else if (res.status === 413) {
    toast.error("File too large, maximum size is 10MB");
  } else if (!res.ok) {
    toast.error("Entity saves fail");
  } else {
    toast.success(`Entity ${buildingData.name} added successfully`);
    return res.json();
  }
}

export async function DeleteBuilding(buildingId: number) {
  //console.log(entityData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${buildingId}`,
    {
      method: "DELETE",
      // credentials: "include",
    }
  );
  if (res.status === 404) {
    toast.error("Building with the given ID not found");
  } else if (res.status === 409) {
    toast.error(
      "Building with the given ID has associated buildings and cannot be deleted"
    );
  } else {
    toast.success(`Entity with ID ${buildingId} deleted successfully`);
    window.location.reload();
    return res.json();
  }
}
