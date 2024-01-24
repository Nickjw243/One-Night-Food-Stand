import React from "react";

function RecipeCard({match}) {

    return (
        <div>
            <h1>{match.recipe.name}</h1>
            <img src={match.recipe.image_url} alt={match.recipe.name}></img>
        </div>
    )
}

export default RecipeCard