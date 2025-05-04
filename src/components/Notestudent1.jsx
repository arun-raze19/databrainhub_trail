import React, { useState, useEffect } from "react";
import axios from "axios";

const Firstyear = () => {
  const [allImage, setAllImage] = useState([]);
  const [semester, setSemester] = useState("1");

  useEffect(() => {
    getPdf();
  }, [semester]);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files6");
      const allPdfs = result.data.data;
      const filtered = allPdfs.filter((pdf) => pdf.semester?.toString() === semester);
      setAllImage(filtered);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const showPdf = (pdf) => {
    window.open(pdf, "_blank", "noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">First Year Notes</h1>
        <p className="text-gray-600">Hi, welcome to the First Year Notes section!</p>
      </div>

      {/* Semester Filter Dropdown */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Semester</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-xl font-bold mb-4">Uploaded PDFs - Semester {semester}</h4>
        {allImage.length === 0 ? (
          <p className="text-gray-600">No files uploaded for this semester yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allImage.map((data) => (
              <div key={data._id} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h6 className="text-gray-800 font-semibold mb-2">Title: {data.title}</h6>
                <button
                  onClick={() => showPdf(data.pdf)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Show PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Firstyear;
