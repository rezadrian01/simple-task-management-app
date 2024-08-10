import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage, { loader as tasksLoader } from "./Pages/Home";
import Auth from "./Pages/Auth";
import AuthCallback from "./Pages/AuthCallback";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: tasksLoader,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "auth/callback",
          element: <AuthCallback />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
