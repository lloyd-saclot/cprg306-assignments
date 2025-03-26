"use client";

import { useState } from 'react';
import Item from './items';

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const groupByCategory = () => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const groupedItems = groupByCategory();

  return (
    <div>
      <div className="mb-4">
        <span className="mr-2">Sort by:</span>
        <button
          onClick={() => setSortBy('name')}
          className={`p-2 mr-2 ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`p-2 mr-2 ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Category
        </button>
        <button
          onClick={() => setSortBy('group')}
          className={`p-2 ${sortBy === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === 'group' ? (
        Object.keys(groupedItems).sort().map((category) => (
          <div key={category}>
            <h2 className="text-xl font-bold capitalize mt-4">{category}</h2>
            <ul>
              {groupedItems[category].map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                  onSelect={onItemSelect}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={onItemSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}