import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentResults = () => {
  const [batch, setBatch] = useState("1"); // Default Batch
  const [semester, setSemester] = useState("");
  const [allPdfs, setAllPdfs] = useState([]);

  useEffect(() => {
    if (batch && semester) {
      fetchPdfs();
    }
  }, [batch, semester]);

  const fetchPdfs = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files14");
      const pdfs = result.data.data;
      const filtered = pdfs.filter(
        (pdf) => pdf.batch?.toString() === batch && pdf.semester?.toString() === semester
      );
      setAllPdfs(filtered);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const showPdf = (pdfUrl) => {
    window.open(pdfUrl, "_blank", "noreferrer");
  };

  const toppersLinkByBatchSemester = {
    "1": {
      "1": "http://localhost:5173/topper3",
      "2": "http://localhost:5173/firstyear/semester2",
      "3": "http://localhost:5173/topper3",
      "4": "http://localhost:5173/topper4",
      "5": "http://localhost:5173/firstyear/semester5",
      "6": "http://localhost:5173/firstyear/semester6",
      "7": "http://localhost:5173/firstyear/semester7",
      "8": "http://localhost:5173/firstyear/semester8",
    },
    "2": {
      "1": "http://localhost:5173/secondyear/semester1",
      "2": "http://localhost:5173/secondyear/semester2",
      "3": "http://localhost:5173/secondyear/semester3",
      "4": "http://localhost:5173/secondyear/semester4",
      "5": "http://localhost:5173/secondyear/semester5",
      "6": "http://localhost:5173/secondyear/semester6",
      "7": "http://localhost:5173/secondyear/semester7",
      "8": "http://localhost:5173/secondyear/semester8",
    },
  };

  const batchSemesters = {
    "1": ["1", "2", "3", "4", "5", "6", "7", "8"],
    "2": ["1", "2", "3", "4", "5", "6", "7", "8"],
  };

  const getToppersLink = (batch, semester) => {
    return toppersLinkByBatchSemester[batch]?.[semester] || "#";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Provisional Results</h1>
        <p className="text-gray-600 mt-2">Select your Batch and Semester to view results.</p>
      </div>

      {/* Batch and Semester Selection */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {/* Batch Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Batch</label>
          <select
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value);
              setSemester(""); // Reset semester when batch changes
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Batch 1</option>
            <option value="2">Batch 2</option>
          </select>
        </div>

        {/* Semester Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Semester</option>
            {batchSemesters[batch]?.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display PDFs */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Available Results</h4>
        {allPdfs.length === 0 ? (
          <p className="text-gray-600">No results uploaded for this batch and semester yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPdfs.map((pdf) => (
              <div key={pdf._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h6 className="text-lg font-semibold text-gray-700 mb-2">{pdf.title}</h6>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => showPdf(pdf.pdf)}
                  >
                    View PDF
                  </button>
                  <a
                    href={getToppersLink(batch, semester)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center justify-center"
                  >
                    View Toppers
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;


