import React from "react";
import { Link } from "react-router-dom";

const Beranda = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-blue-100 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          PRAKTEK JUNIOR WEB DEVELOPER
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          <span className="font-bold text-blue-600">Mohamad Rizki Amrain</span>
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tombol Tugas 1 (BARU) */}
          <Link
            to="/ProductDataTask"
            className="group relative block p-6 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              {/* Judul Utama */}
              <span className="font-bold text-lg mb-2">Buka Tugas Nomor 1</span>
              {/* Deskripsi (Turun ke Bawah) */}
              <span className="text-sm font-medium opacity-80 group-hover:text-blue-100">
                (Menggunakan Struktur Data Array & Object)
              </span>
            </div>
          </Link>

          <Link
            to="/ProductFormTask"
            className="group relative block p-6 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              {/* Judul Utama */}
              <span className="font-bold text-lg mb-2">Buka Tugas Nomor 2</span>
              {/* Deskripsi (Turun ke Bawah) */}
              <span className="text-sm font-medium opacity-80 group-hover:text-blue-100">
                (Mengimplementasikan User Interface)
              </span>
            </div>
          </Link>

          {/* Tombol Tugas 4 */}
          <Link
            to="/ShoppingTask"
            className="group relative block p-6 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              {/* Judul Utama */}
              <span className="font-bold text-lg mb-2">Buka Tugas Nomor 4</span>
              {/* Deskripsi (Turun ke Bawah) */}
              <span className="text-sm font-medium opacity-80 group-hover:text-blue-100">
                (Menulis Kode dengan Guidelines & Best Practices)
              </span>
            </div>
          </Link>

          {/* Tombol Tugas 5 */}
          <Link
            to="/GradeTask"
            className="group relative block p-6 bg-green-50 border border-green-100 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              {/* Judul Utama */}
              <span className="font-bold text-lg mb-2">Buka Tugas Nomor 5</span>
              {/* Deskripsi (Turun ke Bawah) */}
              <span className="text-sm font-medium opacity-80 group-hover:text-green-100">
                (Mengimplementasikan Pemrograman Terstruktur)
              </span>
            </div>
          </Link>

          <Link
            to="/SalesChartTask"
            className="group relative block p-6 bg-pink-50 border border-pink-100 rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              {/* Judul Utama */}
              <span className="font-bold text-lg mb-2">Buka Tugas Nomor 6</span>
              {/* Deskripsi (Turun ke Bawah) */}
              <span className="text-sm font-medium opacity-80 group-hover:text-pink-100">
                (Grafik penjualan bulanan)
              </span>
            </div>
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-gray-400 text-sm">
        © 2025 Junior Web Developer Praktik
      </footer>
    </div>
  );
};

export default Beranda;
