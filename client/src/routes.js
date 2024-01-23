import App from "./components/App"
import Filters from "./components/Filters"
import SignUp from "./components/SignUp"
import Matches from "./components/Matches"
import Recipes from "./components/Recipes"
import SwipePage from "./components/SwipePage"


const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/swipes",
        element: <SwipePage />
    },
    {
        path: "/filters",
        element: <Filters />
    },
    {
        path: "/matches",
        element: <Matches />
    },
    {
        path: "/recipes",
        element: <Recipes />
    }
]

export default routes