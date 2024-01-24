import React, { useEffect, useState } from "react";

function Filters() {
    const [selectedOccasion, setSelectedOccasion] = useState('')
    const [selectedWeather, setSelectedWeather] = useState('')
    const [selectedProtein, setSelectedProtein] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState('')

    return (
        <div>
            <h2>Filters</h2>
            <label>
                Occasion:
                <select
                    value = {selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}>
                    <option value = 'Backyard BBQ'>Backyard BBQ</option>
                    <option value = 'Casual Hang'>Casual Hang</option>
                    <option value = 'Wedding'>Wedding</option>
                    <option value = "Formal">Formal</option>
                    <option value = 'Business'>Business</option>
                    <option value = 'Family Reunion'>Family Reunion</option>
                    <option value = 'Holiday'>Holiday</option>
                    <option value = 'Friend Gathering'>Friend Gathering</option>
                </select>
            </label>
            <label>
                Weather:
                <select
                    value = {selectedWeather}
                    onChange={(e) => setSelectedWeather(e.target.value)}>
                    <option value = 'Sunny'>Sunny</option>
                    <option value = 'Snowy'>Snowy</option>
                    <option value = 'Rainy'>Rainy</option>
                    <option value = 'Hot'>Hot</option>
                    <option value = 'Windy'>Windy</option>
                    <option value = 'Cloudy'>Cloudy</option>
                </select>
            </label>
            <label>
                Protein:
                <select
                    value = {selectedProtein}
                    onChange={(e) => setSelectedProtein(e.target.value)}>
                    <option value = 'Chicken'>Chicken</option>
                    <option value = 'Pork'>Pork</option>
                    <option value = 'Beef'>Beef</option>
                    <option value = 'Lamb'>Lamb</option>
                    <option value = 'Shrimp'>Shrimp</option>
                    <option value = 'Fish'>Fish</option>
                    <option value = 'Vegetarian'>Vegetarian</option>
                </select>
            </label>
            <label>
                Difficulty:
                <select
                    value = {selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}>
                    <option value = 'Easy'>Easy</option>
                    <option value = 'Medium'>Medium</option>
                    <option value = 'Hard'>Hard</option>
                </select>
            </label>
            <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
    )
}

export default Filters;