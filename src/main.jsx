import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Beranda from "./pages/Beranda";
import ShoppingTask from "./pages/Tugas4.jsx";
import ProductDataTask from "./pages/Tugas1.jsx";
import ProductFormTask from "./pages/Tugas2.jsx";
import SalesChartTask from "./pages/Tugas6.jsx";
import GradeTask from "./pages/Tugas5.jsx";
import "./App.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "ProductDataTask",
    element: <ProductDataTask />,
  },
  {
    path: "ProductFormTask",
    element: <ProductFormTask />,
  },
  {
    path: "ShoppingTask",
    element: <ShoppingTask />,
  },
  {
    path: "GradeTask",
    element: <GradeTask />,
  },
  {
    path: "SalesChartTask",
    element: <SalesChartTask />,
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
