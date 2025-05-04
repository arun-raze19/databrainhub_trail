import React, { useState, useEffect } from "react";
import axios from "axios";

const Book4 = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("7");
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getPdf();
  }, [semester]);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files4");
      // Always save all PDFs
      const allPdfs = result.data.data;
      // Filter based on current semester
      const filtered = allPdfs.filter((pdf) => pdf.semester?.toString() === semester);
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
    formData.append("semester", semester); // Include semester in upload

    try {
      await axios.post("http://localhost:5000/upload-4", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setFile(null);
      getPdf(); // Refresh list after upload
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const deletePdf = async (pdfId) => {
    try {
      await axios.delete(`http://localhost:5000/delete4/${pdfId}`);
      getPdf(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const showPdf = (pdf) => {
    window.open(pdf, "_blank", "noreferrer");
  };

  // Filter PDFs by selected semester, with safe handling
  const filteredPdfs = allImage.filter((pdf) => pdf.semester?.toString() === semester);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Final Year Reference Books</h1>
        <p className="text-gray-600 mt-2">Hi, welcome to the Final Year Reference Books section!</p>
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>

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

      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">
          Uploaded PDF
        </h4>
        {filteredPdfs.length === 0 ? (
          <p className="text-gray-600">No files uploaded for this semester yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPdfs.map((data) => (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Book4;