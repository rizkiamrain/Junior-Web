import React from "react";
// Import komponen dari folder pages
import ShoppingTask from "./pages/ShoppingTask";
import GradeTask from "./pages/GradeTask";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Tugas Praktik Junior Web Developer
        </h1>
        <p className="text-gray-600 mt-2">Mohamad Rizki Amrain</p>
      </div>

      {/* Grid container untuk menampilkan kedua tugas berdampingan */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Tugas 4: Belanja */}
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <ShoppingTask />
        </div>

        {/* Tugas 5: Nilai Ujian */}
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <GradeTask />
        </div>
      </div>
    </div>
  );
}

export default App;
