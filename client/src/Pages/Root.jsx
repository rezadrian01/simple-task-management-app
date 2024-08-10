import { Outlet, useNavigate } from "react-router-dom";

import { authAction, tasksAction, uiAction } from "../store";
import TabMenu from "../components/TabMenu";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;

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

  return (
    <div className="bg-emerald-800 min-h-screen">
      <nav className="flex flex-grow-0 justify-between bg-emerald-950/50 text-slate-100 p-4">
        <div>
          <h3>Task management app</h3>
        </div>
        <div className="pr-2 lg:pr-10">
          {isLoggedIn && (
            <div className="flex gap-6  lg:gap-10 ">
              <button>New Task</button>
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
      <main className=" pt-32 text-slate-200 px-2  md:px-8 lg:px-44">
        {isLoggedIn && <TabMenu />}
        <Outlet />
      </main>
    </div>
  );
}
