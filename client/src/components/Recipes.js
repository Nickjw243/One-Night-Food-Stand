import React from "react";
import RecipeCard from "./RecipeCard";
// import SwipePage from "./SwipePage";

function Recipes({ matches }) {
    
    // const filteredMatches = matches.filter((match => {
    //     return match.name}))
    

    return (
        <ul className="recipe-list" >
            {matches.map((match) => {
            return <RecipeCard key={match.id} match={match}/>})}
        </ul>
    )
}

export default Recipes;