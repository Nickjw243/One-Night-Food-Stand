import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({match}) {

//     return (
//         <div>
//             <h1>
//                 <Link className="link-to-recipe-description" to={`/matches/${match.recipe_id}`} > {match.recipe.name} </Link>
//             </h1>
//             <img className = "recipe-card-image" src={match.recipe.image_url} alt={match.recipe.name}></img>
//         </div>
//     )
// }
    return (
        <div class="card text-bg-dark">
        <img src={match.recipe.image_url} class="card-img" alt={match.recipe.name}/>
        <div class="card-img-overlay">
            <h5 class="card-title">{match.recipe.name}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small>Last updated 3 mins ago</small></p>
        </div>
        </div>
        
)}
export default RecipeCard