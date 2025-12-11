import React, { useState } from "react";

const ShoppingTask = () => {
  // 1. State Data
  const [cartItems, setCartItems] = useState([]);

  // 2. State Form
  const [formData, setFormData] = useState({ name: "", qty: "", price: "" });

  // 3. State Hasil Hitungan
  const [result, setResult] = useState(null);

  // 4. State Baru: Menyimpan ID barang yang sedang diedit
  const [editingId, setEditingId] = useState(null);

  // Handle Input Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIKA UTAMA (TAMBAH / UPDATE) ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!formData.name || !formData.qty || !formData.price) {
      alert("Mohon isi semua data barang!");
      return;
    }

    const newItem = {
      id: editingId ? editingId : Date.now(), // Jika edit pakai ID lama, jika baru pakai Date.now()
      name: formData.name,
      qty: parseInt(formData.qty),
      price: parseInt(formData.price),
    };

    if (editingId) {
      // MODE UPDATE: Cari barang berdasarkan ID, lalu ganti datanya
      const updatedItems = cartItems.map((item) =>
        item.id === editingId ? newItem : item
      );
      setCartItems(updatedItems);
      setEditingId(null); // Keluar dari mode edit
    } else {
      // MODE TAMBAH: Masukkan barang baru ke array
      setCartItems([...cartItems, newItem]);
    }

    // Reset Form & Hasil Hitungan
    setFormData({ name: "", qty: "", price: "" });
    setResult(null);
  };

  // --- FUNGSI EDIT (TOMBOL KUNING) ---
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      qty: item.qty,
      price: item.price,
    });
    setResult(null); // Reset hasil agar user menghitung ulang nanti

    // Scroll ke atas (opsional, agar user sadar form sudah terisi)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FUNGSI BATAL EDIT ---
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", qty: "", price: "" });
  };

  // --- FUNGSI HAPUS SATUAN (TOMBOL MERAH) ---
  const handleDeleteItem = (id) => {
    if (window.confirm("Yakin ingin menghapus barang ini?")) {
      const filteredItems = cartItems.filter((item) => item.id !== id);
      setCartItems(filteredItems);
      setResult(null); // Reset hasil karena data berubah

      // Jika yang dihapus adalah barang yang sedang diedit, batalkan mode edit
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  // --- FUNGSI HITUNG TOTAL ---
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
    if (subtotal > 500000) discount = subtotal * 0.1;
    const grandTotal = subtotal - discount;

    setResult({ subtotal, discount, grandTotal });
  };

  // --- FUNGSI HAPUS SEMUA ---
  const handleResetAll = () => {
    if (window.confirm("Hapus SEMUA data?")) {
      setCartItems([]);
      setResult(null);
      handleCancelEdit();
    }
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      {/* --- FORM INPUT --- */}
      <div
        className={`p-6 rounded-xl shadow-md border mb-8 transition-colors ${
          editingId
            ? "bg-yellow-50 border-yellow-200"
            : "bg-white border-gray-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          {editingId ? "✏️ Edit Barang" : "🛒 Input Data Belanja"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Barang
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Laptop"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qty
            </label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Rp"
              min="0"
            />
          </div>

          <div className="md:col-span-4 flex gap-2 mt-2">
            <button
              type="submit"
              className={`flex-1 font-bold py-2 px-4 rounded-lg transition shadow-md ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {editingId ? "💾 Simpan Perubahan" : "+ Tambah ke Keranjang"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4 w-12">No</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right">Harga</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center w-32">Aksi</th>{" "}
                {/* Kolom Baru */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 transition ${
                      editingId === item.id ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="p-4 text-center">{item.qty}</td>
                    <td className="p-4 text-right">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatRupiah(item.price * item.qty)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {/* Tombol Edit */}
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
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
                  <td
                    colSpan="6"
                    className="p-10 text-center text-gray-400 italic"
                  >
                    Keranjang kosong. Silakan input barang di atas.
                  </td>
                </tr>
              )}
            </tbody>

            {/* HASIL PERHITUNGAN */}
            {result && (
              <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 text-right font-bold text-gray-600"
                  >
                    Subtotal:
                  </td>
                  <td className="p-3 text-right font-bold text-gray-800">
                    {formatRupiah(result.subtotal)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 text-right font-bold text-red-500"
                  >
                    Diskon {result.discount > 0 ? "(10%)" : "(0%)"}:
                  </td>
                  <td className="p-3 text-right font-bold text-red-500">
                    -{formatRupiah(result.discount)}
                  </td>
                  <td></td>
                </tr>
                <tr className="bg-blue-600 text-white text-lg">
                  <td colSpan="4" className="p-4 text-right font-bold">
                    Total Bayar:
                  </td>
                  <td className="p-4 text-right font-bold">
                    {formatRupiah(result.grandTotal)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* --- BUTTONS AREA --- */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={handleResetAll}
          className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold py-3 px-6 rounded-lg transition"
        >
          🗑️ Reset Semua
        </button>

        <button
          onClick={handleCalculate}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          🧮 Hitung Total Belanja
        </button>
      </div>
    </div>
  );
};

export default ShoppingTask;
