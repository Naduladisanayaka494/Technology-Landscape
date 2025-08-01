import React from "react";
import { useNews } from "../context/NewsContext";

export default function NewsCard({ article }) {
  const { setSelectedArticle } = useNews();

  return (
    <div
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => setSelectedArticle(article)}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {article.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        {article.pubDate}
      </p>
      <p className="text-gray-700 dark:text-gray-200 mt-2">
        {article.description.substring(0, 100)}...
      </p>
    </div>
  );
}
