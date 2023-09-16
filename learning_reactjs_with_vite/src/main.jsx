import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminList from "./components/adminList";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Message from "./components/message";
import { AuthProvider } from "./context/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <AdminList/>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
      <Login/>
      </>
    ),
  },
  {
    path: "/message/:id",
    element:(
      <>
        <Message/>
      </>
    )
  },
  {
    path: "/dashboard",
    element:(
      <>
        <Dashboard/>
      </>
    )
  }
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);