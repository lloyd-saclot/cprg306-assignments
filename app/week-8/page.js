"use client";

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import itemsData from './items.json';
import MealIdeas from './meal-ideas';

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState(null);

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
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
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