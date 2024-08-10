import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { tasksAction } from "../store";

import CompletedTasks from "../components/CompletedTask";

import { Suspense, useEffect } from "react";
import ProcessTasks from "../components/ProcessTasks";
import IncompletedTasks from "../components/IncompletedTasks";

export default function HomePage() {
  const dispatch = useDispatch();
  const uiState = useSelector((state) => state.ui);
  const data = useLoaderData();
  useEffect(() => {
    async function storeData() {
      const resolvedData = await data.tasks;
      dispatch(tasksAction.replaceTask({ tasks: [...resolvedData.tasks] }));
    }
    storeData();
  }, [data]);

  return (
    <>
      <Suspense
        fallback={
          <p className="animate-pulse text-center text-lg">
            Fetching your tasks...
          </p>
        }
      >
        <Await resolve={data}>
          {uiState === "process" && <ProcessTasks />}
          {uiState === "completedTasks" && <CompletedTasks />}
          {uiState === "failedTasks" && <IncompletedTasks />}
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
