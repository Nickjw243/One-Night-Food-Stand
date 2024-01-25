import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"



function RecipeDescription() {

    const [recipe, setRecipe] = useState({})
    const params = useParams()
    const recipeId = params.id

    useEffect(() => {
        fetch(`/recipes/${recipeId}`)
        .then((r) => r.json())
        .then((data) => setRecipe(data))
    }, [recipeId])

    if (!recipe.name) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="Recipe-Description">
            <ul>
                <img
                className = "recipe-image"
                src={recipe.image_url}
                alt={recipe.name}
                ></img>
                <h4>{recipe.name}</h4>
                <li>{recipe.ingredients}</li>
                <p>{recipe.directions}</p>
            </ul>
        </div>
    )
}

export default RecipeDescription