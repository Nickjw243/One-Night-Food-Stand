import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SwipePage from "./SwipePage"

function App() {
  

  // const url = ""

  // function submitLogIn({submit}) {
  //   const loginOutline = {
  //     email: "",
  //     password: "" 
  //   }
  //   const [form, setForm] = useState(loginOutline)
  //   const handleChange = (e) => {
  //     setForm({
  //       ...form,
  //       [e.target.name]: e.target.value
  //     })
  //   }
  //   // const handleSubmit = (e) => {
  //   //   e.preventDefault()
  //   //   fetch(url){
  //   //     method
  //   //     //---------need to add a get request---------//
  //   //     //---------for email + pw check against backend---------//
  //   //   }
  //   }
  

  return (
  <div className="App">
    <h1>One Night Food Stand</h1>
    {/* <form>
      <input 
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}>
      </input>
      <input 
        type="text"
        name="password"
        value={form.password}
        onChange={handleChange}>
        </input>
      <button className="login_button" type="submit">Log In</button>
    </form> */}
    <h2></h2>
  </div>
  )
}

export default App;
