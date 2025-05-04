import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // new
  const [file, setFile] = useState(null);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-images");
      setAllImages(result.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // new
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete11/${id}`);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Our archivement book</h1>
        <p className="text-gray-600 mt-2">Student of our department were requested to upload there archivement here</p>
      </div>

      <form className="bg-white shadow-md rounded-lg p-6 mb-6" onSubmit={submitImage}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Uploaded Images:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((data) => (
            <div key={data._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <img
                src={data.image} 
                alt={data.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h6 className="text-lg font-semibold text-gray-700">Title: {data.title}</h6>
              {data.description && (
                <p className="text-gray-600 mt-1 mb-3">Description: {data.description}</p>
              )}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => deleteImage(data._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
