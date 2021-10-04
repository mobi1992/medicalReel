import React, {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {apis} from '../../@services'
const initialValues = {
    email : '',
    password : '',
}

// const logIn = values => {
//     console.log('Form data', values)
// }

const validationSchema = Yup.object({
    email : Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password : Yup.string().min('8').required('Please enter a password with min 8 characters')
})
function LogIn() {
    const [loading, setLoading] = useState(false);
    const logInUser = async ({ email, password }) => {
        try {
            setLoading(true)
            const { data } = await apis.login({ email: email.toLocaleLowerCase(), password });
            await localStorage.setItem('AUTH_TOKEN', data.token)
            console.log('Success')
            return
        }
        catch(err) {
            console.log('Error', err)
            alert('Email or password is invalid')
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'col-lg-4 col-md-4 mx-auto'>
                    <div className = 'mt-5 card card-body'>
                        <Formik initialValues = {initialValues}
                        onSubmit = {logInUser}
                        validationSchema = {validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <form onSubmit = {handleSubmit}>
                        <div className = 'form-group'>
                            <label htmlFor = 'email'>Email Address</label>
                            <input className = 'form-control' type = 'text' id = 'email' name = 'email' value = {values.email} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.email && touched.email ? <div className = 'text-danger text-center'>{errors.email}</div> : null}
                        {errors.email && touched.email ? <br></br> : null}

                        <div className = 'form-group'>
                            <label htmlFor = 'password'>Password</label>
                            <input className = 'form-control' type = 'text' id = 'password' name = 'password' value = {values.password} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.password && touched.password ? <div className = 'text-danger text-center'>{errors.password}</div> : null}
                        {errors.password && touched.password ? <br></br> : null}

                        <button className = 'btn btn-dark' type = 'submit'>Login</button>
                        </form>
                        )}
                        </Formik>
                    </div>
                    <br></br>
                    <Link to = '/SignUp'>
                        <div className = 'text-center'>Do not have an account? Sign up</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn
