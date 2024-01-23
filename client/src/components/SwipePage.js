import React, { useEffect, useState } from "react";
import Matches from "./Matches"
import Filters from "./Filters"

function SwipePage({ currentUser, onAddSwipe}) {
    const [body, setBody] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        fetch("/swipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: currentUser.username,
                body: body,
            }),
        })
        .then((r) => r.json())
        .then((newSwipe) => {
            onAddSwipe(newSwipe);
            setBody("");
        })
    }
}

export default SwipePage;