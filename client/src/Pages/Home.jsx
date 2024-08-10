import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import Tasks from "../components/Tasks";
import { useSelector } from "react-redux";
import CompletedTasks from "../components/CompletedTask";
import FailedTasks from "../components/FailedTask";

export default function HomePage() {
  const uiState = useSelector((state) => state.ui);
  const data = useLoaderData();
  console.log(uiState);
  return (
    <>
      {uiState === "tasks" && <Tasks />}
      {uiState === "completedTasks" && <CompletedTasks />}
      {uiState === "failedTasks" && <FailedTasks />}
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
