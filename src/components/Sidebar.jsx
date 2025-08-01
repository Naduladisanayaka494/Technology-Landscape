import React from "react";
import { useNews } from "../context/NewsContext";

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory } = useNews();

  const categories = [
    "All",
    "Gadgets",
    "Gaming",
    "News",
    "Toys",
    "AI",
    "Cybersecurity",
    "Mobile",
    "Web3",
    "Startups",
    "Apple",
    "iPad",
    "iPhone",
    "Policy",
    "Politics",
    "Tech",
  ];

  return (
    <aside className="w-full md:w-1/5 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Categories
      </h2>
      <ul className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer select-none 
                px-4 py-1 rounded-full text-sm font-semibold
                transition-colors duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white"
                }
              `}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") setSelectedCategory(cat);
              }}
              aria-pressed={isActive}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
