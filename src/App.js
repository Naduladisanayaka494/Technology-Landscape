import React from "react";
import { NewsProvider } from "./context/NewsContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
// import "./styles/globals.css";

export default function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Home />
        </div>
      </NewsProvider>
    </ThemeProvider>
  );
}