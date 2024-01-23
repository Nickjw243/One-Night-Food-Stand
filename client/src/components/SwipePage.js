import React, { useEffect, useState } from "react";
import Matches from "./Matches"
import Filters from "./Filters"

function SwipePage({ }) {
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)

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
        <div className='Swipe-Page'>
            <h1>One Night Food Stand</h1>
            <Filters />
            <Matches />
        </div>
    )
}

export default SwipePage;