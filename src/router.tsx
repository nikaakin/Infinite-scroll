import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";

export default createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <div>404</div> },
  { path: "user/:id", element: <User /> },
  { path: "*", element: <Navigate to="/" /> },
]);
