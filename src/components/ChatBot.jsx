import React, { useState, useRef, useEffect } from "react";
import { useNews } from "../context/NewsContext";
import { getAIResponse } from "../services/openaiService";

export default function ChatBot() {
  const { selectedArticle, getRelatedArticles } = useNews();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Add welcome message when article is selected
  useEffect(() => {
    if (selectedArticle) {
      const welcomeMessage = {
        sender: "ai",
        text: `Hi! I'm here to help discuss "${selectedArticle.title}". You can ask me to summarize the article, explain technical concepts, discuss implications, or compare it with related stories. What would you like to know?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setError(null);
    }
  }, [selectedArticle]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const context = selectedArticle
        ? `Title: ${selectedArticle.title}\nContent: ${
            selectedArticle.content || selectedArticle.description
          }\nSource: ${
            selectedArticle.source
          }\nCategories: ${selectedArticle.categories?.join(
            ", "
          )}\nSentiment: ${selectedArticle.sentiment}`
        : "";

      const aiText = await getAIResponse(input, context);

      const aiMessage = {
        sender: "ai",
        text: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = {
        sender: "ai",
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Summarize this article",
    "What are the key implications?",
    "How does this compare to similar news?",
    "Explain the technical details",
  ];

  if (!selectedArticle) {
    return (
      <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 p-6 border-l border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-semibold mb-2">AI Discussion</h3>
          <p>Select an article to start discussing with AI</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 p-6 border-l border-gray-300 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          AI Discussion
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-white dark:bg-gray-800 rounded-lg">
          <strong>Discussing:</strong> {selectedArticle.title}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg break-words ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : msg.isError
                  ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setInput(question)}
                className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about this article..."
          disabled={loading}
          className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          rows={2}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            loading || !input.trim()
              ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Send
        </button>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      )}
    </div>
  );
}
