import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({match}) {

    return (
        <div>
            <h1>
                <Link className="link-to-recipe-description" to={`/matches/${match.recipe_id}`} > {match.recipe.name} </Link>
            </h1>
            <img className = "recipe-card-image" src={match.recipe.image_url} alt={match.recipe.name}></img>
        </div>
    )
}

export default RecipeCard