import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import SwipePage from "./SwipePage";
import Filters from './Filters';
import Matches from './Matches';
import Recipes from './Recipes';
import { Link } from "react-router-dom"

function App() {

  const url = "http://127.0.0.1:5555"
  const navigate = useNavigate()

  const loginOutline = {
    email: "",
    password: "" 
  }
  const [form, setForm] = useState(loginOutline)
  const [loggedIn, setLoggedIn] = useState(loginOutline.email)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        console.log('you signed in')
        setForm(loginOutline)
        setLoggedIn(user.id)
        navSwipe(user.id)
        } else {
          console.log('Login failed: ', user)
        }
    })
  }
  function navSwipe(id) {
    // navigate("/swipes", {state: test})
    navigate("/swipes", { state: { loggedIn: id } });
    // window.history.push({loggedIn}, "/swipes", url)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SwipePage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
      <h1>One Night Food Stand</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required>
        </input>
        <input 
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required>
        </input>
        <button className="login_button" type="submit">Log In</button>
      </form>
      <button>
        <Link className="link" to={`/signup`}>Sign Up Here</Link>
      </button>
    </div>
  )
}

export default App;
