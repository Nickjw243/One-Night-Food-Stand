import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Recipes from "./Recipes";
import NavBar from './NavBar'
import Matches from "./Matches";
import App from "./App"
import { useLocation } from "react-router-dom";
import Filters from "./Filters";

function SwipePage({loggedIn}) {
    console.log(loggedIn)
    let location = useLocation()
    let userID = location.state.loggedIn

    console.log(userID)

  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes from the server
    fetch('/recipes')
    .then((res) => res.json())
    .then((data) => setRecipes(data))
    .catch((error) => console.error('Error fetching recipes:', error));
}, []);

  const isLoading = !Array.isArray(recipes) || recipes.length === 0;

  return (
    <div>
      <h2>Swipe Recipes</h2>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        <div>
          <div>
            <img
              src={recipes[currentRecipeIndex]?.image_url || ''}
              alt="Recipe"
              style={{ width: '300px', height: '200px' }}
            />
            <h3>{recipes[currentRecipeIndex]?.name || ''}</h3>
          </div>
          <div>
            <button onClick={() => setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)}>
              Swipe Left
            </button>
            <button onClick={() => setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)}>
              Swipe Right
            </button>
            <button onClick={() => navigate('/filters')}>
              Go to Filters
            </button>
            <button onClick={() => navigate('/matches')}>
              Go to Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwipePage;

