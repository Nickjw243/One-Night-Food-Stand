import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom"

function SignUp() {
    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/users")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            console.log(data);
        });
    }, [refreshPage]);

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        name: yup.string().required("Must enter a name").max(15),
        password: yup
            .string()
            .required("Must enter password")
            .max(5)
    });

    const formik = useFormik({
        initialValues: {
        name: "",
        email: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch("users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then((res) => {
            if (res.status == 200) {
            setRefreshPage(!refreshPage);
            }
        });
        },
    });

    return (
        <div>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="email">Email Address</label>
            <br />
            <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
            <label htmlFor="name">Name</label>
            <br />

            <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>

            <label htmlFor="password">Password</label>
            <br />

            <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.age}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <button type="submit">
                <Link className="link-to-swipe-page" to={`/swipes`}>Submit</Link>
            </button>
        </form>
        <table style={{ padding: "15px" }}>
            <tbody>
            {users === "undefined" ? (
                <p>Loading</p>
            ) : (
                users.map((user, i) => (
                <>
                    <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    </tr>
                </>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
};

export default SignUp