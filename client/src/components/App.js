import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import SwipePage from "./SwipePage";
import Filters from './Filters';
import Matches from './Matches';
import Recipes from './Recipes';
import { Link } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup"

function App() {

  const url = "http://127.0.0.1:5555"
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter valid email"),
    password: yup.string().required("Password incorrect").max(15)
  })
  
  const [form, setForm] = useState(formSchema)
  const [loggedIn, setLoggedIn] = useState(formSchema.email)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(url + '/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      }).then((r) => {
        if (r.ok) {
          r.json().then(user => {
                if (user.id) {
                  console.log('you signed in')
                  setForm(formSchema)
                  setLoggedIn(user.id)
                  navSwipe(user.id)
                  } else {
                    console.log('Login failed: ', user)
                  }
              })
        } else {
          r.json().then((err) => console.log('error'))
        }
      })
    }
  })

  // const loginOutline = {
  //   email: "",
  //   password: "" 
  // }
  // const [form, setForm] = useState(loginOutline)
  // const [loggedIn, setLoggedIn] = useState(loginOutline.email)
  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   fetch(url + '/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: form.email,
  //       password: form.password,
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(user => {
  //     if (user.id) {
  //       console.log('you signed in')
  //       setForm(loginOutline)
  //       setLoggedIn(user.id)
  //       navSwipe(user.id)
  //       } else {
  //         console.log('Login failed: ', user)
  //       }
  //   })
  // }
  function navSwipe(id) {
    // navigate("/swipes", {state: test})
    navigate("/swipes", { state: { loggedIn: id } });
    // window.history.push({loggedIn}, "/swipes", url)
  }

  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<SwipePage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes> */}
      <h1>One Night Food Stand</h1>
      <form onSubmit={formik.handleSubmit}>
        <input 
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          onBlur={formik.handleBlur}>
        </input>
        <p>{formik.touched.email && formik.errors.email ? (
                <h3>{formik.errors.email}</h3>
            ) : ('')}</p>
        <input 
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
          onBlur={formik.handleBlur}>
        </input>
        <p>{formik.touched.password && formik.errors.password ? (
                <h3>{formik.errors.password}</h3>
            ) : ('')}</p>
        <button className="login_button" type="submit">Log In</button>
      </form>
      <button>
        <Link className="link" to={`/signup`}>Sign Up Here</Link>
      </button>
    </div>
  )
}

export default App;
