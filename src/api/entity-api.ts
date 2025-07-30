import { toast } from "sonner";

// const param = new URLSearch
// const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities`;

export async function AddEntity(entityData: {
  name: string;
  sectionId: number;
  description?: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entities`, {
    method: "POST",
    // credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entityData),
  });
  if (res.status === 400) {
    toast.error("File type not matched with jpeg, png, or gif");
  } else if (res.status === 404) {
    toast.error("Section with the given ID not found");
  } else if (res.status === 413) {
    toast.error("File too large, maximum size is 10MB");
  } else if (!res.ok) {
    toast.error("Entity saves fail");
  } else {
    toast.success(`Entity ${entityData.name} added successfully`);
    return res.json();
  }
}

export async function DeleteEntity(entityId: number) {
  //console.log(entityData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/${entityId}`,
    {
      method: "DELETE",
      // credentials: "include",
    }
  );
  if (res.status === 404) {
    toast.error("Entity with the given ID not found");
  } else if (res.status === 409) {
    toast.error(
      "Entity with the given ID has associated buildings and cannot be deleted"
    );
  } else {
    toast.success(`Entity with ID ${entityId} deleted successfully`);
    window.location.reload();
    return res.json();
  }
}

export async function EditEntity(
  entityId: number,
  entityData: { name: string; section: number; description?: string }
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/edit/${entityId}?confirm=true`,
    {
      method: "POST",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entityData),
    }
  );
  if (res.status === 404) {
    toast.error("Entity with the given ID not found");
  } else if (res.status === 409) {
    toast.error(
      "Entity with the given ID has associated buildings and cannot be updated"
    );
  } else {
    toast.success(`Entity with ID ${entityId} updated successfully`);
    console.log(res);
    //window.location.reload();
    return res.json();
  }
}
