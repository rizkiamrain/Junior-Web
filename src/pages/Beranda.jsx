import React from "react";
import { Link } from "react-router-dom";

const Beranda = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in p-4">
      {/* Kartu Utama */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 max-w-3xl w-full text-center relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 uppercase tracking-tight">
          Praktek Junior Web Developer
        </h1>
        <p className="text-blue-600 font-bold text-lg mb-10">
          Mohamad Rizki Amrain
        </p>

        {/* Grid Menu Tombol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/Tugas1"
            className="group block p-6 bg-purple-50 rounded-2xl border border-purple-100 hover:bg-purple-100 transition shadow-sm hover:shadow-md"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Buka Tugas Nomor 1
            </h3>
            <p className="text-xs text-gray-500">(Struktur Data Array)</p>
          </Link>

          <Link
            to="/Tugas2"
            className="group block p-6 bg-orange-50 rounded-2xl border border-orange-100 hover:bg-orange-100 transition shadow-sm hover:shadow-md"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Buka Tugas Nomor 2
            </h3>
            <p className="text-xs text-gray-500">(User Interface Form)</p>
          </Link>

          <Link
            to="/Tugas4"
            className="group block p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition shadow-sm hover:shadow-md"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Buka Tugas Nomor 4
            </h3>
            <p className="text-xs text-gray-500">(Logic Keranjang Belanja)</p>
          </Link>

          <Link
            to="/Tugas5"
            className="group block p-6 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition shadow-sm hover:shadow-md"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Buka Tugas Nomor 5
            </h3>
            <p className="text-xs text-gray-500">(Hitung Nilai & Predikat)</p>
          </Link>

          <Link
            to="/Tugas6"
            className="group block p-6 bg-pink-50 rounded-2xl border border-pink-100 hover:bg-pink-100 transition shadow-sm hover:shadow-md md:col-span-2"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Buka Tugas Nomor 6
            </h3>
            <p className="text-xs text-gray-500">(Grafik Chart.js)</p>
          </Link>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-400">
        © 2025 Junior Web Developer Praktik
      </div>
    </div>
  );
};

export default Beranda;
