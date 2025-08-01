import React, { useState } from "react";
import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
  const { news, selectedCategory } = useNews();

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // adjust as needed

  // Filter news by category
  const filteredNews = news.filter((article) => {
    if (selectedCategory === "All") return true;
    const cats = Array.isArray(article.categories) ? article.categories : [];
    return cats.some(
      (cat) => typeof cat === "string" && cat === selectedCategory
    );
  });

  // Calculate pagination info
  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredNews.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  // Handler to go to a page
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentArticles.map((article) => (
          <NewsCard key={article.guid} article={article} />
        ))}
      </div>

      {/* Pagination Controls */}
      <nav
        className="flex justify-center items-center space-x-2 mt-6"
        aria-label="Pagination"
      >
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded border ${
                page === currentPage
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </>
  );
}
