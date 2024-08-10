import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import TaskItem from "./TaskItem";

export default function ProcessTasks() {
  const [data, setData] = useState({
    tasks: [],
    totalTasks: 0,
    isLoading: false,
    hasError: false,
    hasFetched: false,
  });
  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_DOMAIN_API}/task/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      return resData;
    }
    try {
      setData((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      fetchTasks().then((resData) => {
        setData((prevData) => ({
          ...prevData,
          tasks: resData.tasks,
          totalTasks: resData.totalTasks,
          hasFetched: true,
          isLoading: false,
        }));
      });
    } catch (err) {
      setData((prevState) => ({
        ...prevState,
        hasError: true,
        hasFetched: true,
        isLoading: false,
      }));
    }
  }, []);
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">Your task</h1>
      {data.tasks.length === 0 && data.hasFetched && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      {data.isLoading && (
        <p className="animate-pulse text-center text-lg">
          Feching your tasks...
        </p>
      )}
      <ul className="flex flex-col gap-4 mb-4">
        {data.tasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
      {data.totalTasks > 0 && data.hasFetched && (
        <p>Total tasks: {data.totalTasks}</p>
      )}
    </>
  );
}
