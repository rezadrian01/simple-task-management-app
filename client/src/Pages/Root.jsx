import { Form, Outlet, useNavigate, useNavigation } from "react-router-dom";

import { authAction, tasksAction, uiAction } from "../store";
import TabMenu from "../components/TabMenu";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/UI/Modal";
import { useState } from "react";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
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
    window.location.href = `${import.meta.env.VITE_DOMAIN_FRONTEND}`;
  }

  return (
    <>
      {isCreate && (
        <Modal onClose={stopCreate}>
          <h2 className="text-2xl font-medium mb-4">New Task</h2>
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                className="focus:outline-none text-slate-800 px-2 py-1 rounded"
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="deadline">Deadline</label>
              <input
                className="focus:outline-none text-slate-800 px-2 py-1 rounded"
                type="date"
                name="deadline"
                id="deadline"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="focus:outline-none text-slate-800 px-2 py-1 rounded"
                type="date"
                name="description"
                id="description"
              />
            </div>
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
      <div className="bg-emerald-800 min-h-screen">
        <nav className="flex flex-grow-0 justify-between bg-emerald-950/50 text-slate-100 p-4">
          <div>
            <h3>Task management app</h3>
          </div>
          <div className="pr-2 lg:pr-10">
            {isLoggedIn && (
              <div className="flex gap-6  lg:gap-10 ">
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
        <main className=" pt-32 text-slate-200 px-2  md:px-8 lg:px-44 pb-32">
          {isLoggedIn && <TabMenu />}
          <Outlet />
        </main>
      </div>
    </>
  );
}
