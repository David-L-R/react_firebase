import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// REACT ROUTER
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import { SignupPage } from "./components/Layout/auth/SignupPage";
import { SigninPage } from "./components/Layout/auth/SigninPage";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <SigninPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
