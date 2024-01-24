import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink
                to = "/filters"
                className = "nav-link"
            >
                Filters
            </NavLink>
            <NavLink
                to = "/swipes"
                className = "nav-link"
            >
                Swipes
            </NavLink>
            <NavLink
                to = "/matches"
                className = "nav-link"
            >
                Matches
            </NavLink>
        </nav>
    )
}

export default NavBar