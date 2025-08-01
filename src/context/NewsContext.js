import { createContext, useContext, useState } from "react";

const NewsContext = createContext();
export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <NewsContext.Provider
      value={{ news, setNews, selectedArticle, setSelectedArticle }}
    >
      {children}
    </NewsContext.Provider>
  );
};
