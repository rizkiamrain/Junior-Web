import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import halaman
import ShoppingTask from "./pages/Tugas4";
import GradeTask from "./pages/Tugas5";
import ProductDataTask from "./pages/Tugas1";
import ProductFormTask from "./pages/Tugas2";
import SalesChartTask from "./pages/Tugas6";
import Beranda from "./pages/Beranda";

function App() {
  return (
    // PENTING: BrowserRouter wajib membungkus aplikasi agar Routes bekerja
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigasi Sederhana (Akan muncul di semua halaman) */}
        <nav className="bg-white shadow-sm p-4 mb-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-lg font-bold text-gray-800 hover:text-blue-600"
            >
              Home
            </Link>
            <div className="space-x-4 text-sm font-medium">
              <Link
                to="/ProductDataTask"
                className="text-gray-600 hover:text-blue-600"
              >
                Tugas 1
              </Link>
              <Link
                to="/ProductFormTask"
                className="text-gray-600 hover:text-blue-600"
              >
                Tugas 2
              </Link>
              <Link
                to="/ShoppingTask"
                className="text-gray-600 hover:text-blue-600"
              >
                Tugas 4
              </Link>
              <Link
                to="/GradeTask"
                className="text-gray-600 hover:text-blue-600"
              >
                Tugas 5
              </Link>
              <Link
                to="/SalesChartTask"
                className="text-gray-600 hover:text-blue-600"
              >
                Tugas 6
              </Link>
            </div>
          </div>
        </nav>

        {/* Area Konten Utama */}
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/ProductDataTask" element={<ProductDataTask />} />
            <Route path="/ProductFormTask" element={<ProductFormTask />} />
            <Route path="/SalesChartTask" element={<SalesChartTask />} />
            <Route path="/ShoppingTask" element={<ShoppingTask />} />
            <Route path="/GradeTask" element={<GradeTask />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
