"use client";

import {useState} from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={decrement}
              disabled={quantity === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl text-black">{quantity}</span>
            <button
              onClick={increment}
              disabled={quantity === 20}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      );
}