import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import UserDashboard from "./routes/dashboard/UserDashboard";
import UploadDashboard from "./routes/dashboard/UploadDashboard";
import Examples from "./routes/examples/Examples";
import Root from "./routes/root/Root";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <UserDashboard />,
        // element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Login />,
      },
      {
        path: "/upload",
        element: <UploadDashboard />,
      },
      {
        path: "/examples",
        element: <Examples />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
