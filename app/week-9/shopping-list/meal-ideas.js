"use client";

import { useState, useEffect } from 'react';

async function fetchMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

async function fetchMealIdeas(ingredient) {
  try {
    if (!ingredient) return [];
    
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    
    const mealsWithDetails = await Promise.all(
      (data.meals || []).map(async (meal) => {
        const details = await fetchMealDetails(meal.idMeal);
        return { ...meal, details };
      })
    );
    
    return mealsWithDetails;
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

function getIngredients(meal) {
  if (!meal?.details) return [];
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal.details[`strIngredient${i}`];
    const measure = meal.details[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const loadMealIdeas = async () => {
    setSelectedMeal(null);
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="ml-8">
      <h2 className="text-xl font-bold mb-4">Meal Ideas</h2>
      {!ingredient ? (
        <p>Select an item to see meal ideas</p>
      ) : meals.length === 0 ? (
        <p>No meal ideas found for {ingredient}</p>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className={`p-3 bg-slate-700 rounded hover:bg-slate-600 cursor-pointer ${
                selectedMeal?.idMeal === meal.idMeal ? 'border-2 border-blue-400' : ''
              }`}
              onClick={() => setSelectedMeal(meal)}
            >
              <h3 className="font-medium">{meal.strMeal}</h3>
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-20 h-20 object-cover rounded mt-2"
              />
              {selectedMeal?.idMeal === meal.idMeal && (
                <div className="mt-2">
                  <h4 className="font-semibold">Ingredients:</h4>
                  <ul className="list-disc pl-5">
                    {getIngredients(meal).map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}