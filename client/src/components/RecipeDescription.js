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
                <h4 className="recipe-title">{recipe.name}</h4>
                <img
                className = "recipe-image"
                src={recipe.image_url}
                alt={recipe.name}
                ></img>
                <ul>{recipe.ingredients}</ul>
                <p>{recipe.directions}</p>
            </ul>
        </div>
    )
}

export default RecipeDescription