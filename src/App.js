import React from "react";
import Home from "./pages/Home";
import { NewsProvider } from "./context/NewsContext";

export default function App() {
  return (
    <NewsProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Home />
      </div>
    </NewsProvider>
  );
}
