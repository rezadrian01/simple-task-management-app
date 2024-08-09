import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";

export default function HomePage() {
  const data = useLoaderData();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.tasks}>
          {(fetchData) => {
            return <h1>HomePage</h1>;
          }}
        </Await>
      </Suspense>
    </>
  );
}

async function fetchTasks() {
  const userId = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_DOMAIN_API}/task/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userId}`,
      },
    }
  );
  const resData = await response.json();
  if (!response.ok) {
    throw json(
      { message: resData.message || "Failed to fetch tasks" },
      { status: response.status || 500 }
    );
  }
  return resData;
}

export function loader() {
  if (!localStorage.getItem("token")) {
    return redirect("/auth");
  }
  return defer({
    tasks: fetchTasks(),
  });
}
