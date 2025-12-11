import React, { useState } from "react";

const GradeTask = () => {
  // State untuk Input Nilai [cite: 28]
  const [scores, setScores] = useState({
    score1: "",
    score2: "",
    score3: "",
  });

  const [result, setResult] = useState(null);

  // Handle perubahan input
  const handleChange = (e) => {
    setScores({
      ...scores,
      [e.target.name]: e.target.value,
    });
  };

  // --- LOGIC FUNCTION (Proses Terstruktur) ---
  const calculateGrade = (e) => {
    e.preventDefault();

    // Konversi string ke number
    const n1 = parseFloat(scores.score1);
    const n2 = parseFloat(scores.score2);
    const n3 = parseFloat(scores.score3);

    // 1. Hitung Rata-rata [cite: 29]
    const average = (n1 + n2 + n3) / 3;

    // 2. Tentukan Predikat [cite: 30]
    let predicate = "";
    let colorClass = "";

    if (average >= 85) {
      predicate = "A";
      colorClass = "text-green-600";
    } else if (average >= 75) {
      predicate = "B";
      colorClass = "text-blue-600";
    } else if (average >= 60) {
      predicate = "C";
      colorClass = "text-yellow-600";
    } else {
      predicate = "D";
      colorClass = "text-red-600";
    }

    setResult({ average, predicate, colorClass });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        Tugas 5: Hitung Nilai Ujian
      </h2>

      <form onSubmit={calculateGrade} className="space-y-4">
        {/* Input Field 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nilai Ujian 1
          </label>
          <input
            type="number"
            name="score1"
            value={scores.score1}
            onChange={handleChange}
            required
            max="100"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Input Field 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nilai Ujian 2
          </label>
          <input
            type="number"
            name="score2"
            value={scores.score2}
            onChange={handleChange}
            required
            max="100"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Input Field 3 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nilai Ujian 3
          </label>
          <input
            type="number"
            name="score3"
            value={scores.score3}
            onChange={handleChange}
            required
            max="100"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Hitung Hasil
        </button>
      </form>

      {/* Output Table [cite: 31] */}
      {result && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Hasil Perhitungan
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-500">
                  Rata-rata
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  {result.average.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-500">
                  Predikat
                </td>
                <td
                  className={`px-4 py-3 text-lg font-extrabold ${result.colorClass}`}
                >
                  {result.predicate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GradeTask;
