import { Form, Outlet, useNavigate, useNavigation } from "react-router-dom";

import { authAction, tasksAction, uiAction } from "../store";
import TabMenu from "../components/TabMenu";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/UI/Modal";
import { useState } from "react";
import Input from "../components/UI/Input";
import { AnimatePresence } from "framer-motion";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const tasksState = useSelector((state) => state.tasks);
  const navigation = useNavigation();
  const [isCreate, setIsCreate] = useState(false);

  const isLoggedIn = authState.isLoggedIn;
  const submiting = navigation.state === "submitting";
  const token = localStorage.getItem("token");

  function handleLogoutClick() {
    localStorage.removeItem("token");
    dispatch(authAction.logout());
    //reset store
    dispatch(tasksAction.resetTasks());
    dispatch(uiAction.process());
    //navigate
    navigate("/auth");
  }

  function handleLoginClick() {
    navigate("/auth");
  }

  function startCreate() {
    setIsCreate(true);
  }

  function stopCreate() {
    setIsCreate(false);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN_API}/task/task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ ...data }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    stopCreate();
    dispatch(tasksAction.addTask({ task: { ...resData.createdTask } }));
    // window.location.href = `${import.meta.env.VITE_DOMAIN_FRONTEND}`;
  }

  return (
    <>
      <AnimatePresence>
        {isCreate && (
          <Modal onClose={stopCreate}>
            <h2 className="text-2xl font-medium mb-4">New Task</h2>
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input id="title" label="Title" type="text" name="title" />
              <Input
                id="deadline"
                label="Deadline"
                type="date"
                name="deadline"
              />
              <Input
                id="description"
                label="Description"
                name="description"
                type="text"
                textarea={true}
              />
              <div className="flex gap-6 justify-end mr-2 mt-4 mb-2">
                <button
                  className="disabled:text-slate-400"
                  disabled={submiting}
                  onClick={stopCreate}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  disabled={submiting}
                  className="bg-emerald-900 hover:bg-emerald-950/50 px-4 py-2 rounded disabled:text-slate-400 disabled:bg-emerald-900"
                >
                  Create
                </button>
              </div>
            </Form>
          </Modal>
        )}
      </AnimatePresence>
      <div className="bg-emerald-800 min-h-screen">
        <nav className="flex flex-grow-0 justify-between items-center bg-emerald-950/50 text-slate-100 py-4 px-2 lg:px-4">
          <div>
            <h3>Task management app</h3>
          </div>
          <div className="pr-2 lg:pr-10">
            {isLoggedIn && (
              <div className="flex gap-2  lg:gap-10 ">
                <button onClick={startCreate}>New Task</button>
                <button
                  onClick={handleLogoutClick}
                  className="bg-emerald-900 px-3 py-1 rounded hover:bg-emerald-950/40 active:scale-105 transition-transform"
                >
                  Logout
                </button>
              </div>
            )}
            {!isLoggedIn && <button onClick={handleLoginClick}>Login</button>}
          </div>
        </nav>
        <main className=" pt-20 text-slate-200 px-2  md:px-8 lg:px-44 pb-32">
          {isLoggedIn && <TabMenu />}
          <Outlet />
        </main>
      </div>
    </>
  );
}
