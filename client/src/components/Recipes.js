import { useState} from "react";
import NavBar from "./NavBar";
// import SwipePage from "./SwipePage";

function Recipes() {
    const [recipe, setRecipe] = useState({})
    

    return (
        <div>
            <header>
                <NavBar />
            </header>
            <h1>Recipes</h1>
        </div>
    )
}

export default Recipes;