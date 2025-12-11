import React, { useState } from "react";

const ProductDataTask = () => {
  // 1. PENGGUNAAN STRUKTUR DATA: ARRAY of OBJECTS
  // Ini memenuhi syarat "Gunakan array" dan "Gunakan object"
  const [products] = useState([
    { id: 1, name: "Laptop Gaming", price: 15000000, stock: 5 },
    { id: 2, name: "Mouse Wireless", price: 150000, stock: 20 },
    { id: 3, name: "Keyboard Mechanical", price: 500000, stock: 10 },
    { id: 4, name: "Monitor 24 inch", price: 2000000, stock: 7 },
    { id: 5, name: "Flashdisk 32GB", price: 80000, stock: 50 },
  ]);

  // 2. LOGIKA PENGURUTAN (SORTING)
  // Mengurutkan dari harga terendah ke tertinggi
  // Kita menggunakan [...products] agar array asli tidak berubah (immutability)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  // 3. LOGIKA CARI MIN & MAX
  // Karena sudah diurutkan, index ke-0 pasti termurah, dan terakhir pasti termahal
  const cheapestProduct = sortedProducts[0];
  const mostExpensiveProduct = sortedProducts[sortedProducts.length - 1];

  // Helper untuk format Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tugas Nomor 1 Struktur Data Produk
        </h1>
        <p className="text-gray-600 mt-2">
          Pengelolaan Array & Object dengan Sorting dan Filtering
        </p>
      </div>

      {/* SECTION 1: PRODUK TERTINGGI & TERENDAH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card Termurah */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm flex flex-col items-center">
          <div className="text-4xl mb-2">🏷️</div>
          <h3 className="text-lg font-bold text-green-800">Harga Terendah</h3>
          <p className="text-xl font-bold text-gray-800 mt-2">
            {cheapestProduct.name}
          </p>
          <p className="text-green-600 font-semibold">
            {formatRupiah(cheapestProduct.price)}
          </p>
          <span className="text-xs text-gray-500 mt-1">
            Stok: {cheapestProduct.stock}
          </span>
        </div>

        {/* Card Termahal */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm flex flex-col items-center">
          <div className="text-4xl mb-2">💎</div>
          <h3 className="text-lg font-bold text-red-800">Harga Tertinggi</h3>
          <p className="text-xl font-bold text-gray-800 mt-2">
            {mostExpensiveProduct.name}
          </p>
          <p className="text-red-600 font-semibold">
            {formatRupiah(mostExpensiveProduct.price)}
          </p>
          <span className="text-xs text-gray-500 mt-1">
            Stok: {mostExpensiveProduct.stock}
          </span>
        </div>
      </div>

      {/* SECTION 2: TABEL DATA TERURUT */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-700">
            📋 Daftar Produk (Diurutkan Termurah → Termahal)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4 w-12">No</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4 text-center">Stok</th>
                <th className="p-4 text-right">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProducts.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{item.name}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.stock > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.stock} pcs
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-medium text-gray-700">
                    {formatRupiah(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTask;
