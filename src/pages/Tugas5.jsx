import React, { useState } from "react";

const Tugas5 = () => {
  const [scores, setScores] = useState({ score1: 0, score2: 0, score3: 0 });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value > 100) value = 100;
    if (value < 0 || isNaN(value)) value = 0;
    setScores({ ...scores, [e.target.name]: value });
  };

  const calculateGrade = (e) => {
    e.preventDefault();
    const n1 = parseFloat(scores.score1);
    const n2 = parseFloat(scores.score2);
    const n3 = parseFloat(scores.score3);
    const average = (n1 + n2 + n3) / 3;

    let predicate = "";
    let description = "";
    let bgGradient = "";

    // Logika Penilaian
    if (average >= 85) {
      predicate = "A";
      description = "Sangat Baik";
      bgGradient = "from-emerald-500 to-emerald-700";
    } else if (average >= 75) {
      predicate = "B";
      description = "Baik";
      bgGradient = "from-blue-500 to-blue-700";
    } else if (average >= 60) {
      predicate = "C";
      description = "Cukup";
      bgGradient = "from-yellow-400 to-yellow-600";
    } else {
      predicate = "D";
      description = "Kurang";
      bgGradient = "from-red-500 to-red-700";
    }

    setResult({ average, predicate, description, bgGradient });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans animate-fade-in">
      {/* HEADER */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Tugas 5: Pemrograman Terstruktur
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 pb-1">
          Sistem Penilaian Akademik
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Hitung rata-rata nilai ujian untuk menentukan Predikat dan Keterangan
          kelulusan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* --- KIRI: FORM INPUT --- */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📝 Input Nilai
          </h2>
          <form onSubmit={calculateGrade} className="space-y-5">
            {["score1", "score2", "score3"].map((field, idx) => (
              <div key={field}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-semibold text-gray-600">
                    Ujian {idx + 1}
                  </label>
                  <span className="text-sm font-bold text-blue-600">
                    {scores[field]}
                  </span>
                </div>
                <input
                  type="range"
                  name={field}
                  min="0"
                  max="100"
                  value={scores[field]}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition transform active:scale-95"
            >
              Hitung Hasil
            </button>
          </form>

          {/* TABEL KRITERIA (Referensi) */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              Kriteria Penilaian
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 text-sm">
              <table className="w-full text-left bg-gray-50">
                <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
                  <tr>
                    <th className="p-3">Nilai</th>
                    <th className="p-3">Predikat</th>
                    <th className="p-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="p-3">85 - 100</td>
                    <td className="p-3 font-bold text-emerald-600">A</td>
                    <td className="p-3">Sangat Baik</td>
                  </tr>
                  <tr>
                    <td className="p-3">75 - 84</td>
                    <td className="p-3 font-bold text-blue-600">B</td>
                    <td className="p-3">Baik</td>
                  </tr>
                  <tr>
                    <td className="p-3">60 - 74</td>
                    <td className="p-3 font-bold text-yellow-600">C</td>
                    <td className="p-3">Cukup</td>
                  </tr>
                  <tr>
                    <td className="p-3">0 - 59</td>
                    <td className="p-3 font-bold text-red-600">D</td>
                    <td className="p-3">Kurang</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- KANAN: HASIL --- */}
        <div className="h-full">
          {result ? (
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 h-full flex flex-col items-center justify-center text-center relative overflow-hidden animate-bounce-in">
              {/* Background Header */}
              <div
                className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-br ${result.bgGradient} opacity-10`}
              ></div>

              <h3 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-8 z-10">
                Hasil Akhir
              </h3>

              {/* Nilai Besar */}
              <div className="relative z-10 mb-2">
                <h1 className="text-6xl font-black text-gray-800">
                  {result.average.toFixed(1)}
                </h1>
                <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
                  Nilai Rata-rata
                </span>
              </div>

              {/* Divider */}
              <div className="w-16 h-1 bg-gray-200 rounded-full my-6"></div>

              {/* Predikat & Keterangan */}
              <div className="z-10">
                <p className="text-gray-500 text-sm mb-1">Predikat Anda:</p>
                <div
                  className={`inline-flex flex-col items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r ${result.bgGradient} text-white shadow-lg shadow-gray-200`}
                >
                  <span className="text-5xl font-extrabold mb-1">
                    {result.predicate}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider border-t border-white/30 pt-1 mt-1 w-full block">
                    {result.description}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <span className="text-5xl mb-4">🎓</span>
              <p>Masukkan nilai untuk melihat hasil.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tugas5;
