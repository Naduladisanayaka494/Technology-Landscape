import React from "react";
import { useNews } from "../context/NewsContext";

export default function NewsCard({ article }) {
  const { setSelectedArticle, toggleBookmark, isBookmarked } = useNews();

  const handleClick = () => {
    setSelectedArticle(article);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(article);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 dark:text-green-400";
      case "negative":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "📈";
      case "negative":
        return "📉";
      default:
        return "📊";
    }
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-2">
            {article.categories?.slice(0, 2).map((category, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          <button
            onClick={handleBookmark}
            className={`p-1 rounded-full transition-colors ${
              isBookmarked(article)
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-400 hover:text-yellow-500"
            }`}
            aria-label="Bookmark article"
          >
            {isBookmarked(article) ? "★" : "☆"}
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>{article.source}</span>
            <span>{article.readTime} min read</span>
            <span
              className={`flex items-center space-x-1 ${getSentimentColor(
                article.sentiment
              )}`}
            >
              <span>{getSentimentIcon(article.sentiment)}</span>
              <span className="capitalize">{article.sentiment}</span>
            </span>
          </div>

          <time dateTime={article.pubDate}>
            {new Date(article.pubDate).toLocaleDateString()}
          </time>
        </div>
      </div>
    </article>
  );
}
