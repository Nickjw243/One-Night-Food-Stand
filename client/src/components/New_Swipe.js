import React, { useEffect, useState } from "react";

function NewSwipe({ currentUser, onAddSwipe}) {
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