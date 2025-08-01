import React, { useState } from "react";
import { useNews } from "../context/NewsContext";
import { getAIResponse } from "../services/openaiService";

export default function ChatBot() {
  const { selectedArticle } = useNews();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { sender: "user", text: input };
    const aiMessage = {
      sender: "ai",
      text: await getAIResponse(
        `${input}\nArticle: ${selectedArticle?.content || ""}`
      ),
    };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  if (!selectedArticle) return null;

  return (
    <div className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 border-l border-gray-300 dark:border-gray-600">
      <h2 className="text-xl font-bold mb-2">AI Discussion</h2>
      <div className="h-96 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.sender === "user" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded-l border dark:bg-gray-700 dark:text-white"
          placeholder="Ask about this article..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
