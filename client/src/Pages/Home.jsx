import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import TaskItem from "../components/TaskItem";

export default function HomePage() {
  const data = useLoaderData();
  return (
    <>
      <Suspense
        fallback={
          <p className="animate-pulse text-center text-lg">
            Fetching your tasks...
          </p>
        }
      >
        <Await resolve={data.tasks}>
          {(fetchData) => {
            const { tasks, totalTasks } = fetchData;
            return (
              <>
                <h1 className="text-4xl font-semibold mb-6">Your task</h1>
                {tasks.length === 0 && (
                  <p className="text-center">You dont have any tasks yet.</p>
                )}
                <ul className="flex flex-col gap-4 mb-4">
                  {tasks.map((task) => {
                    return <TaskItem task={task} key={task._id} />;
                  })}
                </ul>
                {totalTasks && totalTasks > 0 && (
                  <p>Total tasks: {totalTasks}</p>
                )}
              </>
            );
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
