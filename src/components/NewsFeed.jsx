import React from "react";
import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
  const { news, selectedCategory } = useNews();

  const filterByCategory = (article) => {
    if (selectedCategory === "All") return true;

    const cats = Array.isArray(article.categories) ? article.categories : [];

    return cats.some(
      (cat) => typeof cat === "string" && cat === selectedCategory
    );
  };

  if (!news.length) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 dark:border-gray-600 h-16 w-16"></div>
        <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
          Loading news...
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.filter(filterByCategory).map((article) => (
        <NewsCard key={article.guid} article={article} />
      ))}
    </div>
  );
}
