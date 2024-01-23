import React, { useEffect, useState } from "react";
// import Matches from "./Matches"
// import Filters from "./Filters"
import Recipes from "./Recipes";

function SwipePage() {
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        //Fetch recipes from the server
        fetch('/recipes')
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error('Error fetching recipes:', error))
    }, [])

    function handleSwipeLeft() {
        setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)
    }

    function handleSwipeRight() {
        setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length)
    }

    // function handleSubmit(e) {
    //     e.preventDefault()

    //     fetch("/swipes", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             username: currentUser.username,
    //             body: body,
    //         }),
    //     })
    //     .then((r) => r.json())
    //     .then((newSwipe) => {
    //         onAddSwipe(newSwipe);
    //         setBody("");
    //     })
    // }

    return (
        <div>
            <h2>Swipe Recipes</h2>
            {recipes && recipes.length > 0 ? (
                <div>
                    <div>
                        <img src = {recipes[currentRecipeIndex].image_url} alt = 'Recipe' style = {{width: '300px', height: '200px'}} />
                        <h3>{recipes[currentRecipeIndex].name}</h3>
                    </div>
                    <div>
                        <button onClick = {handleSwipeLeft}>Swipe Left</button>
                        <button onClick = {handleSwipeRight}>Swipe Right</button>
                    </div>
                    </div>
            ) : (
                <p>Loading recipes...</p>
            )}
        </div>
    )
}

export default SwipePage;