import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// REACT ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { SignupPage } from "./components/Layout/auth/SignupPage";
import { SigninPage } from "./components/Layout/auth/SigninPage";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

const router = createBrowserRouter([
  {
    path: "/",
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
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
