// week-9/shopping-list/page.js
"use client";

import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState(null);

  if (!user) {
    return (
      <main className="min-h-screen p-4 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">You need to be signed in to view this page.</p>
        <Link
          href="/week-9"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName
      .replace(/,.*|\d+.*|🍞|🥛|🥚|🍌|🥦|🍗|🍝|🧻|🍽️|🧼/g, '')
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <button
          onClick={firebaseSignOut}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Sign Out
        </button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}