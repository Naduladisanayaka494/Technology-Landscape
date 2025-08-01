

import { createContext, useContext, useState } from "react";

const NewsContext = createContext();
export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <NewsContext.Provider
      value={{
        news,
        setNews,
        selectedArticle,
        setSelectedArticle,
        selectedCategory,
        setSelectedCategory, // Make sure to provide this function here
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

