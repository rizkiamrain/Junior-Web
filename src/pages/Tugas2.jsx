import React, { useState } from "react";

const ProductFormTask = () => {
  // State untuk data form
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
  });

  // State untuk menyimpan data yang berhasil di-submit (untuk demo tampilan)
  const [submittedData, setSubmittedData] = useState([]);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit dengan Validasi
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. VALIDASI: Cek apakah semua field terisi
    if (
      !formData.productName ||
      !formData.price ||
      !formData.stock ||
      !formData.category
    ) {
      alert("❌ Harap isi semua kolom sebelum menyimpan!");
      return;
    }

    // Jika lolos validasi, simpan data (Simulasi)
    const newData = {
      id: Date.now(),
      ...formData,
    };

    setSubmittedData([...submittedData, newData]);

    // Reset Form
    setFormData({ productName: "", price: "", stock: "", category: "" });
    alert("✅ Produk berhasil disimpan!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tugas Nomor 2 User Interface Form
        </h1>
        <p className="text-gray-600 mt-2">
          Implementasi Form Input Produk dengan Validasi & Desain Responsif
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* --- FORM INPUT SECTION --- */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📝 Input Produk Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field: Nama Produk */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Contoh: Kopi Bubuk 100gr"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Grid untuk Harga & Stok (Responsif: Sebelahan di desktop, tumpuk di HP) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Field: Harga */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Field: Stok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stok <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Field: Kategori (Dropdown) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Makanan">Makanan & Minuman</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Simpan Produk
            </button>
          </form>
        </div>

        {/* --- PREVIEW SECTION (Agar terlihat hasilnya) --- */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              💡 Info UI/UX
            </h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Halaman ini mendemonstrasikan implementasi <b>Form Validation</b>{" "}
              dan <b>Responsive Layout</b>. Coba tekan tombol "Simpan" tanpa
              mengisi data untuk melihat validasi berjalan.
            </p>
          </div>

          {/* List Produk yang baru diinput */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-bold text-gray-700">
                Produk Tersimpan ({submittedData.length})
              </h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
              {submittedData.length === 0 ? (
                <p className="text-center text-gray-400 py-4 italic">
                  Belum ada data produk.
                </p>
              ) : (
                submittedData.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-bold text-gray-800">
                        {item.productName}
                      </p>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-semibold">
                        Rp {parseInt(item.price).toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stok: {item.stock}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormTask;
