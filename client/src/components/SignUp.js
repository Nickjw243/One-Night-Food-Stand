import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom"

function SignUp() {

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
        password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch('/users', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            if (res.ok) {
            res.json().then((user) => {
                console.log('ok')
            })
            } else {
                res.json().then((err) => console.log('error'))
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
            value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <button type="submit">
                <Link className="link-to-swipe-page" to={`/swipes`}>Submit</Link>
            </button>
        </form>
        {/* <table style={{ padding: "15px" }}>
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
        </table> */}
        </div>
    );
};

export default SignUp