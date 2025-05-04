import React, { useState, useEffect } from "react";
import axios from "axios";

const Book1 = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [batch, setBatch] = useState("1"); // Default Batch
  const [semester, setSemester] = useState("");
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getPdf();
  }, [batch, semester]); // Re-fetch when batch or semester changes

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files14");
      const allPdfs = result.data.data;
      const filtered = allPdfs.filter(
        (pdf) => pdf.batch?.toString() === batch && pdf.semester?.toString() === semester
      );
      setAllImage(filtered);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("batch", batch);
    formData.append("semester", semester);

    try {
      await axios.post("http://localhost:5000/upload-14", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setFile(null);
      getPdf();
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const deletePdf = async (pdfId) => {
    try {
      await axios.delete(`http://localhost:5000/delete14/${pdfId}`);
      getPdf();
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const showPdf = (pdf) => {
    window.open(pdf, "_blank", "noreferrer");
  };

  // Define Toppers links for each batch and semester
  const toppersLinkByBatchSemester = {
    "1": {  // Batch 1
      "1": "http://localhost:5173/topper3",
      "2": "http://localhost:5173/firstyear/semester2",
      "3": "http://localhost:5173/topper3",
      "4": "http://localhost:5173/topper4",
      "5": "http://localhost:5173/firstyear/semester5",
      "6": "http://localhost:5173/firstyear/semester6",
      "7": "http://localhost:5173/firstyear/semester7",
      "8": "http://localhost:5173/firstyear/semester8",
    },
    "2": {  // Batch 2
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

  // Get the correct topper link for selected batch + semester
  const getToppersLink = (batch, semester) => {
    return toppersLinkByBatchSemester[batch]?.[semester] || "#"; // If not found, #
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Provisional Results</h1>
        <p className="text-gray-600 mt-2">Hi, Here comes the Batchwise and Semesterwise Result!</p>
      </div>

      <form className="bg-white shadow-md rounded-lg p-6 mb-6" onSubmit={submitImage}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Batch Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Batch</label>
          <select
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value);
              setSemester("");
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
            required
          >
            <option value="">Select Semester</option>
            {batchSemesters[batch]?.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Choose PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Uploaded PDFs Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Results and Toppers</h4>
        {allImage.length === 0 ? (
          <p className="text-gray-600">No files uploaded for this batch and semester yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allImage.map((data) => (
              <div key={data._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h6 className="text-lg font-semibold text-gray-700">Title: {data.title}</h6>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show PDF
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => deletePdf(data._id)}
                  >
                    Delete
                  </button>
                  <a
                    href={getToppersLink(batch, semester)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center justify-center"
                  >
                    Toppers
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

export default Book1;


