import React, { useState } from "react";

const ProductFormTask = () => {
  // 1. STATE GLOBAL (Data Produk disimpan di sini agar tetap ada saat ganti role)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kopi Arabika",
      price: 75000,
      stock: 50,
      category: "Makanan",
    },
    {
      id: 2,
      name: "Kaos Polos Hitam",
      price: 45000,
      stock: 120,
      category: "Pakaian",
    },
    {
      id: 3,
      name: "Headset Bluetooth",
      price: 250000,
      stock: 15,
      category: "Elektronik",
    },
  ]);

  // 2. STATE ROLE (user / admin / null)
  const [role, setRole] = useState(null); // null artinya belum memilih

  // 3. STATE FORM (Hanya dipakai Admin)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  // --- LOGIKA ADMIN (CRUD) ---

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi Wajib Diisi
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.category
    ) {
      alert("❌ Semua field wajib diisi!");
      return;
    }

    const newData = {
      id: editingId ? editingId : Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
    };

    if (editingId) {
      // Update
      setProducts(products.map((p) => (p.id === editingId ? newData : p)));
      setEditingId(null);
      alert("✅ Produk berhasil diupdate!");
    } else {
      // Create
      setProducts([...products, newData]);
      alert("✅ Produk baru disimpan!");
    }

    // Reset Form
    setFormData({ name: "", price: "", stock: "", category: "" });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      stock: item.stock,
      category: item.category,
    });
    // Scroll ke atas agar admin lihat formnya
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({ name: "", price: "", stock: "", category: "" });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", stock: "", category: "" });
  };

  // Helper Format Rupiah
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  // --- TAMPILAN 1: PILIH ROLE (Jika role masih null) ---
  if (!role) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tugas 2: User Interface
        </h1>
        <p className="text-gray-600 mb-8">
          Silakan pilih akses Anda untuk melanjutkan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          {/* Tombol User */}
          <button
            onClick={() => setRole("user")}
            className="flex flex-col items-center justify-center p-10 bg-white border-2 border-blue-100 rounded-2xl shadow-lg hover:border-blue-500 hover:shadow-2xl transition-all group"
          >
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-4xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              👤
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Masuk sebagai User
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              Hanya melihat daftar produk yang tersedia.
            </p>
          </button>

          {/* Tombol Admin */}
          <button
            onClick={() => setRole("admin")}
            className="flex flex-col items-center justify-center p-10 bg-white border-2 border-orange-100 rounded-2xl shadow-lg hover:border-orange-500 hover:shadow-2xl transition-all group"
          >
            <div className="bg-orange-100 text-orange-600 p-4 rounded-full text-4xl mb-4 group-hover:bg-orange-600 group-hover:text-white transition">
              🛠️
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Masuk sebagai Admin
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              Kelola produk (Tambah, Edit, Hapus).
            </p>
          </button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN UTAMA (User & Admin) ---
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Header dengan Tombol Ganti Role */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {role === "admin" ? "🛠️ Dashboard Admin" : "🛍️ Katalog Produk User"}
          </h1>
          <p className="text-sm text-gray-500">
            Mode Akses: <span className="uppercase font-bold">{role}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setRole(null);
            setEditingId(null);
          }}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          🔄 Ganti Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* --- BAGIAN KIRI: FORM (HANYA MUNCUL JIKA ADMIN) --- */}
        {role === "admin" && (
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-orange-100 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              {editingId ? "✏️ Edit Produk" : "➕ Input Produk Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Nama barang..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Harga <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Rp"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Stok <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-400 outline-none bg-white"
                >
                  <option value="">-- Pilih --</option>
                  <option value="Elektronik">Elektronik</option>
                  <option value="Pakaian">Pakaian</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className={`flex-1 text-white font-bold py-2 rounded-lg shadow-md transition ${
                    editingId
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {editingId ? "Update" : "Simpan"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* --- BAGIAN KANAN: DAFTAR PRODUK (USER & ADMIN LIHAT INI) --- */}
        <div
          className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${
            role === "admin" ? "lg:col-span-2" : "lg:col-span-3"
          }`}
        >
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-bold text-gray-700">
              📦 Daftar Produk Tersimpan
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {products.length} Item
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4">Produk</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4 text-right">Harga</th>
                  <th className="p-4 text-center">Stok</th>
                  {/* Kolom Aksi Hanya Muncul untuk Admin */}
                  {role === "admin" && (
                    <th className="p-4 text-center">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 ${
                        editingId === item.id ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="p-4 font-bold text-gray-800">
                        {item.name}
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-blue-600">
                        {formatRupiah(item.price)}
                      </td>
                      <td className="p-4 text-center text-gray-600">
                        {item.stock}
                      </td>

                      {/* Tombol Aksi Admin */}
                      {role === "admin" && (
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-yellow-100 text-yellow-600 p-1.5 rounded hover:bg-yellow-200"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-100 text-red-600 p-1.5 rounded hover:bg-red-200"
                              title="Hapus"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 5 : 4}
                      className="p-8 text-center text-gray-400"
                    >
                      Data kosong.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormTask;
