import React, { useState } from "react";

const ShoppingTask = () => {
  // 1. STATE KERANJANG & FORM
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    qty: "",
    price: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 2. STATE HASIL HITUNGAN (PREVIEW)
  const [result, setResult] = useState(null);

  // 3. STATE BARU: RIWAYAT TRANSAKSI (LAPORAN)
  const [transactionHistory, setTransactionHistory] = useState([]);

  // --- HANDLE INPUT (Smart Logic) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue =
      name === "qty" || name === "price"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  // --- CRUD KERANJANG ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.qty ||
      !formData.price ||
      !formData.category
    ) {
      alert("⚠️ Mohon lengkapi semua data: Nama, Kategori, Qty, dan Harga!");
      return;
    }

    const newItem = {
      id: editingId ? editingId : Date.now(),
      name: formData.name,
      category: formData.category,
      qty: parseInt(formData.qty),
      price: parseInt(formData.price),
    };

    if (editingId) {
      setCartItems(
        cartItems.map((item) => (item.id === editingId ? newItem : item))
      );
      setEditingId(null);
    } else {
      setCartItems([...cartItems, newItem]);
    }

    setFormData({ name: "", qty: "", price: "", category: "" });
    setResult(null); // Reset preview hitungan jika ada perubahan data
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      qty: item.qty,
      price: item.price,
      category: item.category,
    });
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", qty: "", price: "", category: "" });
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Hapus item ini?")) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setResult(null);
      if (editingId === id) handleCancelEdit();
    }
  };

  const handleResetAll = () => {
    if (window.confirm("Kosongkan keranjang?")) {
      setCartItems([]);
      setResult(null);
      handleCancelEdit();
    }
  };

  // --- HITUNG PREVIEW (TOMBOL HIJAU) ---
  const handleCalculate = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
      return;
    }
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    let discount = 0;
    if (subtotal > 500000) discount = subtotal * 0.1; // Diskon 10%
    const grandTotal = subtotal - discount;

    setResult({ subtotal, discount, grandTotal });
  };

  // --- FITUR BARU: SIMPAN KE LAPORAN (CHECKOUT) ---
  const handleCheckout = () => {
    if (!result) return;

    if (
      window.confirm(
        "Simpan transaksi ini ke Laporan? Keranjang akan dikosongkan."
      )
    ) {
      const newTransaction = {
        id: `TRX-${Date.now().toString().slice(-6)}`, // ID Unik: TRX-123456
        date: new Date().toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }), // Tanggal: 12 Des 2025, 14:30
        items: [...cartItems], // Salin item belanja
        details: result, // Salin total & diskon
      };

      // 1. Masukkan ke History
      setTransactionHistory([newTransaction, ...transactionHistory]);

      // 2. Reset Keranjang & Form
      setCartItems([]);
      setResult(null);
      handleCancelEdit();

      alert("✅ Transaksi Berhasil Disimpan!");
    }
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in font-sans">
      {/* HEADER */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
            Tugas 4: Shopping Cart
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 pb-1">
          Smart Cashier System
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- KIRI: FORM INPUT --- */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">{editingId ? "✏️" : "🛍️"}</span>
            {editingId ? "Edit Item" : "Input Barang"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Nama Barang
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="Contoh: Laptop"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition cursor-pointer"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Fashion">Fashion</option>
                <option value="Makanan">Makanan & Minuman</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Qty
                </label>
                <input
                  type="number"
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="1"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Harga
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                  placeholder="Rp"
                  min="0"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className={`flex-1 font-bold py-3 px-4 rounded-xl shadow-lg transform transition active:scale-95 text-white ${
                  editingId
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {editingId ? "Update" : "+ Tambah"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-100 text-gray-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* --- KANAN: KERANJANG & PREVIEW --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* TABEL KERANJANG */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">🛒 Keranjang Belanja</h3>
              <span className="bg-white text-gray-600 text-xs font-bold px-3 py-1 rounded-full border">
                {cartItems.length} Item
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="p-4">Produk</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className={`group hover:bg-indigo-50/50 transition ${
                          editingId === item.id ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="p-4">
                          <div className="font-bold text-gray-800">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.category}
                          </div>
                        </td>
                        <td className="p-4 text-center">{item.qty}</td>
                        <td className="p-4 text-right font-bold text-indigo-600">
                          {formatRupiah(item.price * item.qty)}
                        </td>
                        <td className="p-4 text-center flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-amber-500 hover:bg-amber-100 p-1.5 rounded transition"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:bg-red-100 p-1.5 rounded transition"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-8 text-center text-gray-400 italic"
                      >
                        Keranjang kosong.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOMBOL AKSI */}
          {cartItems.length > 0 && !result && (
            <div className="flex justify-end gap-3">
              <button
                onClick={handleResetAll}
                className="px-5 py-2.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
              >
                Reset
              </button>
              <button
                onClick={handleCalculate}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition transform hover:-translate-y-1"
              >
                Hitung Total 💳
              </button>
            </div>
          )}

          {/* KARTU PREVIEW BAYAR (MUNCUL SETELAH HITUNG) */}
          {result && (
            <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-2xl animate-bounce-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>{formatRupiah(result.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-red-400 text-sm">
                    <span>Diskon {result.discount > 0 && "(10%)"}</span>
                    <span>-{formatRupiah(result.discount)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-700 flex justify-between items-center">
                    <span className="text-indigo-200 font-bold uppercase text-sm">
                      Total Bayar
                    </span>
                    <span className="text-3xl font-extrabold">
                      {formatRupiah(result.grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-xl font-bold text-gray-900 bg-white hover:bg-gray-100 shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>💾</span> Bayar & Simpan ke Laporan
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="w-full py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                  >
                    Kembali Edit Keranjang
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- BAGIAN BARU: LAPORAN PEMBELIAN --- */}
      <div className="mt-16 pt-10 border-t-2 border-dashed border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📄 Laporan Riwayat Pembelian
        </h2>

        {transactionHistory.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {transactionHistory.map((trx) => (
              <div
                key={trx.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                {/* Header Laporan */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mr-2">
                      {trx.id}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      📅 {trx.date}
                    </span>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-xs text-gray-500 uppercase">
                      Total Transaksi
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {formatRupiah(trx.details.grandTotal)}
                    </p>
                  </div>
                </div>

                {/* Detail Item */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-200">
                        <th className="pb-2 font-medium">Item</th>
                        <th className="pb-2 text-center">Qty</th>
                        <th className="pb-2 text-right">Harga Satuan</th>
                        <th className="pb-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {trx.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2 text-gray-700 font-medium">
                            {item.name}{" "}
                            <span className="text-xs text-gray-400 font-normal">
                              ({item.category})
                            </span>
                          </td>
                          <td className="py-2 text-center text-gray-600">
                            {item.qty}
                          </td>
                          <td className="py-2 text-right text-gray-600">
                            {formatRupiah(item.price)}
                          </td>
                          <td className="py-2 text-right text-gray-800">
                            {formatRupiah(item.price * item.qty)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ringkasan Footer */}
                <div className="flex justify-end gap-6 text-sm">
                  <div className="text-gray-500">
                    Subtotal:{" "}
                    <span className="font-bold text-gray-700">
                      {formatRupiah(trx.details.subtotal)}
                    </span>
                  </div>
                  <div className="text-red-500">
                    Diskon:{" "}
                    <span className="font-bold">
                      {formatRupiah(trx.details.discount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 text-gray-400">
            <span className="text-4xl block mb-2">📭</span>
            <p>Belum ada riwayat transaksi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingTask;
