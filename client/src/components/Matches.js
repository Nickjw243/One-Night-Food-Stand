import React from "react";
import Recipes from "./Recipes"
import { useLocation } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom";


function Matches() {
    let location = useLocation()
    let userID = location.state.loggedIn
    const navigate = useNavigate();
    console.log(userID)

    return (
        <div>
            <h1>Matches</h1>
            <ul className="matches" >
                <Recipes />
            </ul>
        </div>
    )
}

export default Matches;