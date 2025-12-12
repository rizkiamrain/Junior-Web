import React, { useState } from "react";

const Tugas1 = () => {
  // 1. STATE DATA PRODUK
  const [products, setProducts] = useState([
    { id: 1, name: "Mouse Wireless", price: 150000, stock: 20 },
    { id: 2, name: "Keyboard Mechanical", price: 500000, stock: 10 },
    { id: 3, name: "Flashdisk 32GB", price: 80000, stock: 50 },
  ]);

  // 2. STATE FORM
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });

  // 3. STATE MODE EDIT (Menyimpan ID produk yang sedang diedit)
  const [editingId, setEditingId] = useState(null);

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIKA UTAMA: TAMBAH / UPDATE ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!formData.name || !formData.price || !formData.stock) {
      alert("Mohon lengkapi semua data produk!");
      return;
    }

    const inputData = {
      id: editingId ? editingId : Date.now(), // Pakai ID lama jika edit, ID baru jika tambah
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (editingId) {
      // MODE UPDATE: Cari ID yang cocok, lalu ganti datanya
      const updatedProducts = products.map((item) =>
        item.id === editingId ? inputData : item
      );
      setProducts(updatedProducts);
      setEditingId(null); // Keluar mode edit
      alert("✅ Data berhasil diperbarui!");
    } else {
      // MODE TAMBAH: Masukkan ke array
      setProducts([...products, inputData]);
      alert("✅ Produk baru berhasil ditambahkan!");
    }

    // Reset Form
    setFormData({ name: "", price: "", stock: "" });
  };

  // --- LOGIKA EDIT ---
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      stock: item.stock,
    });
    // Scroll ke form agar user melihat
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- LOGIKA BATAL EDIT ---
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", stock: "" });
  };

  // --- LOGIKA HAPUS ---
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const filteredProducts = products.filter((item) => item.id !== id);
      setProducts(filteredProducts);

      // Jika produk yang sedang diedit malah dihapus, batalkan mode edit
      if (editingId === id) {
        handleCancel();
      }
    }
  };

  // --- PENGOLAHAN DATA (SORTING & STATISTIK) ---
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  const cheapestProduct = sortedProducts.length > 0 ? sortedProducts[0] : null;
  const mostExpensiveProduct =
    sortedProducts.length > 0
      ? sortedProducts[sortedProducts.length - 1]
      : null;

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in font-sans">
      {/* HEADER SECTION */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="text-xs font-bold text-purple-600 tracking-wider uppercase">
            Tugas 1: Manajemen Produk
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 pb-1">
          Inventaris Barang
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- KOLOM KIRI: FORM INPUT (4 Kolom) --- */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">{editingId ? "✏️" : "📦"}</span>
            {editingId ? "Edit Produk" : "Tambah Produk"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition"
                placeholder="Contoh: Mouse Wireless"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className={`flex-1 font-bold py-3 px-4 rounded-xl shadow-lg transform transition active:scale-95 text-white ${
                  editingId
                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
                    : "bg-purple-600 hover:bg-purple-700 shadow-purple-200"
                }`}
              >
                {editingId ? "Update Produk" : "+ Simpan"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-100 text-gray-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* --- KOLOM KANAN: STATISTIK & TABEL (8 Kolom) --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* STATISTIK HARGA */}
          {products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-white p-3 rounded-xl text-2xl shadow-sm">
                  🏷️
                </div>
                <div>
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">
                    Harga Terendah
                  </h3>
                  <p className="text-lg font-bold text-gray-800 leading-tight">
                    {cheapestProduct.name}
                  </p>
                  <p className="text-emerald-700 font-mono font-medium">
                    {formatRupiah(cheapestProduct.price)}
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-white p-3 rounded-xl text-2xl shadow-sm">
                  💎
                </div>
                <div>
                  <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">
                    Harga Tertinggi
                  </h3>
                  <p className="text-lg font-bold text-gray-800 leading-tight">
                    {mostExpensiveProduct.name}
                  </p>
                  <p className="text-rose-700 font-mono font-medium">
                    {formatRupiah(mostExpensiveProduct.price)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TABEL DATA */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                📋 Daftar Produk
              </h3>
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Total: {products.length} Item
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="p-5 w-16 text-center">No</th>
                    <th className="p-5">Nama Produk</th>
                    <th className="p-5 text-center">Stok</th>
                    <th className="p-5 text-right">Harga</th>
                    <th className="p-5 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {products.length > 0 ? (
                    sortedProducts.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`group hover:bg-purple-50/50 transition ${
                          editingId === item.id ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="p-5 text-center text-gray-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="p-5 font-bold text-gray-800">
                          {item.name}
                        </td>
                        <td className="p-5 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                              item.stock > 0
                                ? "bg-gray-100 text-gray-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {item.stock} pcs
                          </span>
                        </td>
                        <td className="p-5 text-right font-mono font-medium text-purple-600">
                          {formatRupiah(item.price)}
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 hover:bg-amber-100 text-amber-600 rounded-lg transition"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
                              title="Hapus"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-300">
                          <span className="text-6xl mb-4">📦</span>
                          <p className="text-lg font-medium text-gray-400">
                            Belum ada data produk.
                          </p>
                          <p className="text-sm">
                            Silakan tambah produk baru di panel kiri.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tugas1;
