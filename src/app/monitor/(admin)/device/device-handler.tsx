export async function GetAllAccessPoint() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/accesspoints`
  );
  if (!res.ok) {
    throw new Error("fail to fetching GetAllAccessPoint");
  }
  return await res.json();
}

export async function GetDownAccessPoint() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/accesspoints/down`
  );
  if (!res.ok) {
    throw new Error("fail to fetching GetDownAccessPoint");
  }
  return await res.json();
}
