import React from "react";
import { useNews } from "../context/NewsContext";

export default function Sidebar() {
  const {
    selectedCategory,
    setSelectedCategory,
    getTrendingTopics,
    bookmarks,
  } = useNews();

  const categories = [
    "All",
    "AI",
    "Startups",
    "Mobile",
    "Cybersecurity",
    "Web3",
    "Gaming",
    "Apple",
    "Google",
    "Meta",
    "Tesla",
    "Tech",
  ];

  const trendingTopics = getTrendingTopics();

  return (
    <aside className="w-full md:w-1/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-6">
      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Trending Topics
        </h3>
        <div className="space-y-2">
          {trendingTopics.slice(0, 5).map(({ topic, count }) => (
            <div
              key={topic}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-700 dark:text-gray-300">{topic}</span>
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmarks */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Bookmarks ({bookmarks.length})
        </h3>
        {bookmarks.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {bookmarks.slice(0, 3).map((article) => (
              <div
                key={article.guid}
                className="text-sm text-gray-600 dark:text-gray-400 truncate"
              >
                {article.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No bookmarks yet
          </p>
        )}
      </div>
    </aside>
  );
}
