import React, { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.guid === article.guid);
      if (isBookmarked) {
        return prev.filter((b) => b.guid !== article.guid);
      } else {
        return [...prev, article];
      }
    });
  };

  const isBookmarked = (article) => {
    return bookmarks.some((b) => b.guid === article.guid);
  };

  const getFilteredNews = () => {
    let filtered = [...news];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((article) => {
        const categories = Array.isArray(article.categories)
          ? article.categories
          : [];
        return categories.some(
          (cat) =>
            typeof cat === "string" &&
            cat.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title?.toLowerCase().includes(query) ||
          article.description?.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query)
      );
    }

    // Time filter
    if (timeFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (timeFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter((article) => {
        const articleDate = new Date(article.pubDate);
        return articleDate >= filterDate;
      });
    }

    return filtered;
  };

  const getTrendingTopics = () => {
    const topics = {};
    news.forEach((article) => {
      if (article.categories) {
        article.categories.forEach((cat) => {
          if (typeof cat === "string") {
            topics[cat] = (topics[cat] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(topics)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));
  };

  const getRelatedArticles = (article) => {
    if (!article || !article.categories) return [];

    return news
      .filter((a) => a.guid !== article.guid)
      .filter((a) => {
        if (!a.categories) return false;
        return a.categories.some((cat) => article.categories.includes(cat));
      })
      .slice(0, 5);
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        setNews,
        selectedArticle,
        setSelectedArticle,
        selectedCategory,
        setSelectedCategory,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        searchQuery,
        setSearchQuery,
        timeFilter,
        setTimeFilter,
        loading,
        setLoading,
        error,
        setError,
        getFilteredNews,
        getTrendingTopics,
        getRelatedArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
