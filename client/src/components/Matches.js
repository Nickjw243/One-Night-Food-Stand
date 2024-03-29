import React, { useEffect, useState } from "react";
import Recipes from "./Recipes"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Matches() {
    let location = useLocation()
    let userID = location.state.loggedIn
    const navigate = useNavigate();
    const [matches, setMatches] = useState([])
    console.log(userID)


    useEffect(() => {
        fetchMatches()
    }, [])

    function fetchMatches() {
    fetch('/swipes/' + userID)
    .then(r => r.json())
    .then(data => {
        setMatches(data)
        console.log(data)
    })
}

function handleSwipesNav() {
    navigate("/swipes", { state: { loggedIn: userID } });
  }

    return (
        <div>
            <button>
                <Link className ="link-to-log-out" to={'/'} >Log Out</Link>
            </button>
            <button onClick={handleSwipesNav}>Go to Swipes</button>
            <h1 className= 'matches-title'>Matches</h1>
            <ul className="matches" >
                <Recipes key={matches.id} matches = {matches}/>
            </ul>
        </div>
    )
}

export default Matches;