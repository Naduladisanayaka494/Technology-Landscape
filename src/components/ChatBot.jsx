import React, { useState } from "react";
import { useNews } from "../context/NewsContext";
import { getAIResponse } from "../services/openaiService";

export default function ChatBot() {
  const { selectedArticle } = useNews();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: input };
    const aiText = await getAIResponse(
      `${input}\nArticle: ${selectedArticle?.content || ""}`
    );
    const aiMessage = { sender: "ai", text: aiText };

    setMessages((msgs) => [...msgs, userMessage, aiMessage]);
    setInput("");
    setLoading(false);
  };

  if (!selectedArticle) return null;

  return (
    <div className="w-full md:w-1/4 bg-gray-50 dark:bg-gray-900 p-5 border-l border-gray-300 dark:border-gray-700 rounded-l-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        AI Discussion
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-thumb-indigo-400 dark:scrollbar-track-gray-700 p-2 rounded bg-white dark:bg-gray-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] p-3 rounded-lg break-words whitespace-pre-line
              ${
                msg.sender === "user"
                  ? "bg-indigo-100 text-indigo-900 self-end"
                  : "bg-green-100 text-green-900 self-start"
              }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-indigo-500 italic text-sm">AI is typing...</div>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          placeholder="Ask about this article..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) sendMessage();
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-5 py-3 rounded-r-md font-semibold transition
            ${
              loading
                ? "bg-indigo-300 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
