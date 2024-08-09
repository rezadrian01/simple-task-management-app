import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage, { loader as tasksLoader } from "./Pages/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
