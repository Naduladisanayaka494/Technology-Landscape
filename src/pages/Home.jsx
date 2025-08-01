import React, { useEffect } from "react";
import { fetchTechNews } from "../services/newsService";
import { useNews } from "../context/NewsContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsFeed from "../components/NewsFeed";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const { setNews } = useNews();

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchTechNews();
      setNews(articles);
    };
    loadNews();
  }, [setNews]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        <NewsFeed />
      </main>
      <ChatBot />
    </div>
  );
}
