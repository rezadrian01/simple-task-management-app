import { json, useLoaderData } from "react-router-dom";

export default function HomePage() {
  const data = useLoaderData();
  return (
    <>
      <h1>HomePage</h1>
    </>
  );
}

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_DOMAIN_API}`);
  const resData = await response.json();
  if (!response.ok) {
    throw json(
      { message: resData.message || "Failed to fetch tasks" },
      { status: response.status || 500 }
    );
  }
  return resData;
}
