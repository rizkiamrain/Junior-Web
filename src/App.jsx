import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

// --- IMPORT FILE SESUAI NAMA YANG BARU DI FOLDER ---
import Beranda from "./pages/Beranda";
import Tugas1 from "./pages/Tugas1"; // Dulu ProductDataTask
import Tugas2 from "./pages/Tugas2"; // Dulu ProductFormTask
import Tugas4 from "./pages/Tugas4"; // Dulu ShoppingTask
import Tugas5 from "./pages/Tugas5"; // Dulu GradeTask (INI YANG PENTING)
import Tugas6 from "./pages/Tugas6"; // Dulu SalesChartTask

// --- KOMPONEN NAVBAR (Menu Atas) ---
const Navbar = () => {
  const location = useLocation();

  // Fungsi untuk memberi warna biru pada menu yang sedang aktif
  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-50 text-blue-600 font-bold shadow-sm"
      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50";
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* MENU KIRI (Navigasi Tugas) */}
          <div className="flex items-center overflow-x-auto no-scrollbar py-2 gap-1 md:gap-2">
            {/* Tombol Kembali ke Home */}
            <Link
              to="/"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-800 transition whitespace-nowrap"
            >
              ⬅ <span className="hidden sm:inline">Menu Utama</span>
            </Link>
            <div className="h-5 w-px bg-gray-300 mx-2"></div>{" "}
            {/* Garis Pemisah */}
            <Link
              to="/Tugas1"
              className={`px-3 py-2 rounded-lg text-sm transition whitespace-nowrap ${isActive(
                "/Tugas1"
              )}`}
            >
              Tugas 1
            </Link>
            <Link
              to="/Tugas2"
              className={`px-3 py-2 rounded-lg text-sm transition whitespace-nowrap ${isActive(
                "/Tugas2"
              )}`}
            >
              Tugas 2
            </Link>
            <Link
              to="/Tugas4"
              className={`px-3 py-2 rounded-lg text-sm transition whitespace-nowrap ${isActive(
                "/Tugas4"
              )}`}
            >
              Tugas 4
            </Link>
            <Link
              to="/Tugas5"
              className={`px-3 py-2 rounded-lg text-sm transition whitespace-nowrap ${isActive(
                "/Tugas5"
              )}`}
            >
              Tugas 5
            </Link>
            <Link
              to="/Tugas6"
              className={`px-3 py-2 rounded-lg text-sm transition whitespace-nowrap ${isActive(
                "/Tugas6"
              )}`}
            >
              Tugas 6
            </Link>
          </div>

          {/* LABEL KANAN (Branding) */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-300 ml-4">
            <div className="text-right">
              <h1 className="text-sm font-bold text-gray-800 leading-tight">
                Junior Web Developer
              </h1>
              <p className="text-[10px] text-gray-500 font-medium">VSGA 2025</p>
            </div>
            {/* Logo Inisial */}
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- LAYOUT UTAMA ---
const MainLayout = () => {
  const location = useLocation();

  // Cek apakah user sedang di halaman Beranda ('/')
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Navbar HANYA MUNCUL jika BUKAN di halaman Home */}
      {!isHomePage && <Navbar />}

      {/* Padding Konten: 
          - Kalau di Home: padding normal (py-10)
          - Kalau di Tugas: padding atas besar (pt-24) supaya judul tidak ketutup Navbar */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isHomePage ? "py-10" : "pt-24 pb-10"
        }`}
      >
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/Tugas1" element={<Tugas1 />} />
          <Route path="/Tugas2" element={<Tugas2 />} />
          <Route path="/Tugas4" element={<Tugas4 />} />
          <Route path="/Tugas5" element={<Tugas5 />} />
          <Route path="/Tugas6" element={<Tugas6 />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <MainLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;
