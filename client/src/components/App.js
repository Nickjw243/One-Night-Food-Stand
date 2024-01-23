import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SwipePage from "./SwipePage"
import { Link } from "react-router-dom"

function App() {

  const url = "http://127.0.0.1:5555"


    const loginOutline = {
      email: "",
      password: "" 
    }
    const [form, setForm] = useState(loginOutline)
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault()

      // if(form.email == 'Adam'){
      //   console.log(`SUCCESS ** Email Match: ${form.email}`)
      // } else {
      //   console.log(`ERROR ** Email Error: ${form.email} does not exist`)
      // }
      fetch(url + '/users/' + form.email)
      .then(response => response.json())
      .then(user => {
        if (user.user_email) {
          if (user.passwordhash == form.password) {
            console.log('you signed in')
            setForm(loginOutline)
          } else {
            console.log('Wrong password')
          }
        } else {
          console.log(`Email ${form.email} does not exist`)
        }
      })  
  }

  return (
    <div className="App">
      <h1>One Night Food Stand</h1>
      <form onSubmit={handleSubmit}>
      <input 
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}>
      </input>
      <h2>Password</h2>
      <input 
        type="text"
        name="password"
        value={form.password}
        onChange={handleChange}>
      </input>
      <button className="login_button" type="submit">Log In</button>
      </form>
      <button>
        <Link className="link" to={`/signup`}>Sign Up Here</Link>
      </button>
      <button>Sign Up Here</button>
    </div>
  )
}

export default App;
