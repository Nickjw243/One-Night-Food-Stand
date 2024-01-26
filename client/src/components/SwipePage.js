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
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const currentRecipe = recipes.find(r => r.id === currentRecipeId)

  useEffect(() => {
    // Fetch recipes from the server
    fetch(`/hello/${userID}`)
    .then((res) => res.json())
    .then((data) => {
      setRecipes(data)
      if (data.length > 0) {
        setCurrentRecipeId(data[0].id)
      }
      console.log(data)
    })
    .catch((error) => console.error('Error fetching recipes:', error));
}, [userID]);

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
      recipe_id: currentRecipeId
    })
  })
  .then(response => response.json())
  .then(data => {
    // setCurrentRecipeId((prevIndex) => (prevIndex + 1) % recipes.length)
    setCurrentRecipeId(recipes[(recipes.findIndex(r => r.id === currentRecipeId) + 1) % recipes.length].id);
  })
  }

  function handleSwipeRight(e) {
    e.preventDefault()
    console.log(`Requesting: ${currentRecipeId}`)
    //post for the dislike
    fetch('/swipes',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      swipe: 1,
      user_id: userID,
      recipe_id: currentRecipeId
    })
    })
    .then(response => response.json())
    .then(data => {
      // setCurrentRecipeId((prevIndex) => (prevIndex + 1) % recipes.length)
      setCurrentRecipeId(recipes[(recipes.findIndex(r => r.id === currentRecipeId) + 1) % recipes.length].id);
      console.log(`Response: ${data.recipe_id}`)
    })
  }

  function handleFiltersNav() {
    navigate("/filters", { state: { loggedIn: userID } });
  }

  function handleMatchesNav() {
    navigate("/matches", { state: { loggedIn: userID } });
  }
  
  return (
    <div className="recipe-swipe-div">
      <header>
        <button>
          <Link className ="link-to-log-out" to={'/'} >Log Out</Link>
        </button>
      </header>
      <h2 className="swipe-recipes-text">Swipe Recipes</h2>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        <div>
          {recipes.length > 0 && currentRecipe && (
            <div>
                <img className="recipe-swipe-image"
                  src={currentRecipe.image_url || ''}
                  alt="Recipe"
                  style={{ width: '300px', height: '200px'}}
                />
                <h3 className="swipe-current-recipe-text">{currentRecipe.name || ''}</h3>
              </div>
          )}
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

