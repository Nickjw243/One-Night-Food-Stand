import React, { useEffect, useState } from "react";
import Matches from "./Matches"
import Filters from "./Filters"

function SwipePage({ currentUser, onAddSwipe}) {
    const [swipes, setSwipes] = useState("");

    useEffect(() => {
        fetch('/swipes')
        .then(r => r.json())
        .then(data => setSwipes(data))
    }, [])
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
            <h1>Swipes</h1>
            <Filters />
            <Matches />
        </div>
    )
}

export default SwipePage;