export default async function GetData() {
  // return /api/zone
  const response = await fetch("http://localhost:3001/zones");
  if (response.ok) {
    const data = await response.json();
    return data;
  } else throw new Error("Error when fetching data");
}
