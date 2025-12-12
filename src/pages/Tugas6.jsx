import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// 1. Registrasi Komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Tugas6 = () => {
  // --- DATA DUMMY (Bisa diganti data API nanti) ---

  // Data Grafik Batang (Penjualan Bulanan)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Omzet 2025 (Juta Rp)",
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Biru Tailwind
        borderRadius: 8,
        hoverBackgroundColor: "#2563EB",
      },
    ],
  };

  // Data Grafik Donat (Kategori Produk)
  const categoryData = {
    labels: ["Elektronik", "Fashion", "Makanan", "Lainnya"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          "#6366F1", // Indigo
          "#EC4899", // Pink
          "#F59E0B", // Amber
          "#10B981", // Emerald
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // Opsi Grafik (Agar Responsif & Cantik)
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tren Penjualan Semester 1" },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#F3F4F6" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans animate-fade-in pb-20">
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-2">
            🚀 Tugas 6: Visualisasi Data
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Dashboard Penjualan
          </h1>
          <p className="text-gray-500 mt-1">
            Monitoring performa bisnis secara real-time.
          </p>
        </div>

        {/* Tombol Aksi Dummy */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium transition">
            📅 Filter Tanggal
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-200 transition">
            ⬇ Download Report
          </button>
        </div>
      </div>

      {/* 1. KARTU STATISTIK (RINGKASAN) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Omzet */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Pendapatan
              </p>
              <h3 className="text-3xl font-black text-gray-800">Rp 123.5Jt</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
              💰
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-bold flex items-center bg-green-50 px-2 py-0.5 rounded">
              ↗ 12.5%
            </span>
            <span className="text-gray-400 ml-2">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 2: Total Transaksi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Transaksi
              </p>
              <h3 className="text-3xl font-black text-gray-800">1,452</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition">
              🛒
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-bold flex items-center bg-green-50 px-2 py-0.5 rounded">
              ↗ 8.2%
            </span>
            <span className="text-gray-400 ml-2">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 3: Pelanggan Baru */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Pelanggan Baru
              </p>
              <h3 className="text-3xl font-black text-gray-800">320</h3>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition">
              👥
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 font-bold flex items-center bg-red-50 px-2 py-0.5 rounded">
              ↘ 2.1%
            </span>
            <span className="text-gray-400 ml-2">vs bulan lalu</span>
          </div>
        </div>
      </div>

      {/* 2. AREA GRAFIK UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GRAFIK BATANG (Lebar 2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">
              📊 Statistik Penjualan
            </h3>
            <button className="text-sm text-blue-600 hover:underline">
              Lihat Detail
            </button>
          </div>
          <div className="h-80 w-full">
            <Bar data={salesData} options={barOptions} />
          </div>
        </div>

        {/* GRAFIK DONAT (Lebar 1/3) */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 text-lg">
              🍩 Kategori Terlaris
            </h3>
            <p className="text-xs text-gray-400">
              Distribusi penjualan per kategori
            </p>
          </div>

          <div className="relative h-64 flex justify-center items-center">
            <Doughnut
              data={categoryData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              💡 <strong>Insight:</strong> Produk{" "}
              <span className="text-indigo-600 font-bold">Elektronik</span>{" "}
              mendominasi 45% penjualan bulan ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tugas6;
