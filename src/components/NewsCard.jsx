import React from "react";
import { useNews } from "../context/NewsContext";

export default function NewsCard({ article }) {
  const { setSelectedArticle } = useNews();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition cursor-pointer"
      onClick={() => setSelectedArticle(article)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") setSelectedArticle(article);
      }}
      aria-label={`Open article: ${article.title}`}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {article.title}
      </h3>
      <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-1 font-medium">
        {new Date(article.pubDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mt-3 line-clamp-3">
        {article.description}
      </p>
    </div>
  );
}
