import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom"

function SignUp() {

    const formSchema = yup.object().shape({
        user_email: yup.string().email("Invalid email").required("Must enter email"),
        username: yup.string().required("Must enter a name").max(15),
        passwordhash: yup
            .string()
            .required("Must enter password")
            .max(5)
    });

    const formik = useFormik({
        initialValues: {
        username: "",
        user_email: "",
        passwordhash: ""
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
            <label>Email Address</label>
            <br />
            <input
            id="user_email"
            name="user_email"
            onChange={formik.handleChange}
            value={formik.values.user_email}
            onBlur={formik.handleBlur}
            />
            <p>{formik.touched.user_email && formik.errors.user_email ? (
                <h3>{formik.errors.user_email}</h3>
            ) : ('')}</p>

            <label>Name</label>
            <br />

            <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            />
            <p>{formik.touched.username && formik.errors.username ? (
                <h3>{formik.errors.username}</h3>
            ) : ('')}</p>

            <label>Password</label>
            <br />

            <input
            id="passwordhash"
            name="passwordhash"
            onChange={formik.handleChange}
            value={formik.values.passwordhash}
            onBlur={formik.handleBlur}
            />
            <p> {formik.touched.passwordhash && formik.errors.passwordhash ? (
                <h3>{formik.errors.passwordhash}</h3>
            ) : ('')}</p>
            <button type="submit">Submit</button>
            <button>
                <Link className="link-to-login" to={'/'}> Login</Link></button>
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