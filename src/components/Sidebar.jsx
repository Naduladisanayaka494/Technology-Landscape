import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-1/5 bg-white dark:bg-gray-800 p-4">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <ul className="space-y-2">
        {["AI/ML", "Cybersecurity", "Mobile", "Web3", "Startups"].map((cat) => (
          <li
            key={cat}
            className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline"
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
