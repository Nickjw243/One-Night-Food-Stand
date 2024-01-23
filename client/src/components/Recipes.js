import React, { useState, useEffect } from "react";
import SwipePage from "./SwipePage";

function Recipes() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        //Fetch recipes from the server
        fetch('/recipes')
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error('Error fetching recipes:', error))
    }, [])
}

export default Recipes;