import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// REACT ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { SignupPage } from "./pages/auth/SignupPage";
import { SigninPage } from "./pages/auth/SigninPage";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import CreatePost from "./pages/post/CreatePost";

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
  {
    path: "/create",
    element: <CreatePost />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>
);
