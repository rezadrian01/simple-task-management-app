import { Outlet } from "react-router-dom";
import TabMenu from "../components/TabMenu";

export default function RootLayout() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <>
      {/* <h1>Root Layout</h1>
      <nav className="flex flex-grow-0 justify-between">
        <div>
          <h3>Task management app</h3>
        </div>
        <div>
          <a>Home</a>
        </div>
        <div>
          {isLoggedIn && <a>Logout</a>}
          {!isLoggedIn && <a>Login</a>}
        </div>
      </nav> */}
      <main className="bg-emerald-800 min-h-screen pt-32 text-slate-200 px-2  md:px-8 lg:px-44">
        {isLoggedIn && <TabMenu />}
        <Outlet />
      </main>
    </>
  );
}
