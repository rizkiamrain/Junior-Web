import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Tugas4 from "./pages/Tugas4.jsx";
import Tugas1 from "./pages/Tugas1.jsx";
import Tugas2 from "./pages/Tugas2.jsx";
import Tugas6 from "./pages/Tugas6.jsx";
import Tugas5 from "./pages/Tugas5.jsx";
import "./App.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "Tugas1",
    element: <Tugas1 />,
  },
  {
    path: "Tugas2",
    element: <Tugas2 />,
  },
  {
    path: "Tugas4",
    element: <Tugas4 />,
  },
  {
    path: "Tugas5",
    element: <Tugas5 />,
  },
  {
    path: "Tugas6",
    element: <Tugas6 />,
  },
  {
    path: "/",
    element: <Beranda />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
