import React from "react";
// Import komponen dari react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrasi komponen Chart.js agar bisa digunakan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChartTask = () => {
  // 1. DATA PENJUALAN (Sesuai Soal: Jan-Jun)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grafik Penjualan Semester 1 (2025)",
      },
    },
  };

  const data = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
    datasets: [
      {
        label: "Penjualan (Juta Rupiah)",
        data: [12, 19, 10, 25, 22, 30], // Data Dummy
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Warna Biru Tailwind
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tugas 6: Visualisasi Data
        </h1>
        <p className="text-gray-600 mt-2">
          Implementasi Grafik Menggunakan Library <b>Chart.js</b>
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Render Grafik */}
        <Bar options={options} data={data} />

        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
          <strong>Keterangan:</strong> Grafik di atas menampilkan simulasi data
          penjualan dari bulan Januari hingga Juni. Library yang digunakan
          adalah <code>react-chartjs-2</code>.
        </div>
      </div>
    </div>
  );
};

export default SalesChartTask;
