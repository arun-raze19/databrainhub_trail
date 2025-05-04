import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const newChat = { user: question, bot: "" };
    setChatHistory((prev) => [...prev.slice(-4), newChat]); // Keep only last 5

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/chat", {
        question: question,
      });
      const answer = res.data.answer;

      // Update the last chat entry with bot response
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = answer;
        return updated;
      });
    } catch (err) {
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = "❌ Something went wrong.";
        return updated;
      });
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded h-[90vh] flex flex-col">
      <h1 className="text-xl font-bold mb-4">📚 Ask me anything</h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatHistory.map((chat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs text-right">
                {chat.user}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-black px-4 py-2 rounded-lg max-w-xs text-left">
                {chat.bot || "🤖 Thinking..."}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <textarea
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Type your question here..."
        ></textarea>
        <button
          onClick={handleAsk}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;







