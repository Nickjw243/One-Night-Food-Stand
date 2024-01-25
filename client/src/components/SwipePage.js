import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Recipes from "./Recipes";
import Matches from "./Matches";
import App from "./App"
import { useLocation } from "react-router-dom";
import Filters from "./Filters";



function SwipePage({loggedIn}) {
  // --------- USER ID STATE MGMT ---------//
    console.log(loggedIn)
    let location = useLocation()
    let userID = location.state.loggedIn
    const navigate = useNavigate();

    console.log(userID)
// --------- USER ID STATE MGMT ---------//
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [recipes, setRecipes] = useState([]);

  let random_array=[]
  function appendToArray(i){
    random_array.push(i)
  }
  useEffect(() => {
    // Fetch recipes from the server
    fetch(`/hello/${userID}`)
    .then((res) => res.json())
    .then((data) => {
      setRecipes(data)
      console.log(data)
    })
    .catch((error) => console.error('Error fetching recipes:', error));
}, []);

  const isLoading = !Array.isArray(recipes) || recipes.length === 0;

  function handleSwipeLeft(e) {
    e.preventDefault()

    //post for the dislike
    fetch('/swipes',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      swipe: 0,
      user_id: userID,
      recipe_id: currentRecipeIndex+1
    })
  })
  .then(response => response.json())
  .then(data => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  })
  }

  function handleSwipeRight(e) {
    e.preventDefault()

    //post for the dislike
    fetch('/swipes',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      swipe: 1,
      user_id: userID,
      recipe_id: currentRecipeIndex +1
    })
  })
  .then(response => response.json())
  .then(data => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  })
  }

  function handleFiltersNav() {
    navigate("/filters", { state: { loggedIn: userID } });
  }

  function handleMatchesNav() {
    navigate("/matches", { state: { loggedIn: userID } });
  }

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
            <button onClick={handleSwipeLeft}>
              Swipe Left
            </button>
            <button onClick={handleSwipeRight}>
              Swipe Right
            </button>
            <button onClick={handleFiltersNav}>
              Go to Filters
            </button>
            <button onClick={handleMatchesNav}>
              Go to Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwipePage;

