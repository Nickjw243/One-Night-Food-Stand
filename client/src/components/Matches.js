import React from "react";
import Recipes from "./Recipes"
import NavBar from "./NavBar";

function Matches() {


    return (
        <div>
            <header>
                <NavBar />
            </header>
            <h1>Matches</h1>
            <ul className="matches" >
                <Recipes />
            </ul>
        </div>
    )
}

export default Matches;