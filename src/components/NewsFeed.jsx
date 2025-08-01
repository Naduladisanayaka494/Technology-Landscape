import React from "react";
import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
  const { news } = useNews();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {news.map((article) => (
        <NewsCard key={article.guid} article={article} />
      ))}
    </div>
  );
}
