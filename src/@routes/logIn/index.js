import React, {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import {apis} from '../../@services'
import { password_show_hide } from '../../@components'
import {routePaths} from '../../@services'
const initialValues = {
    email : '',
    password : '',
}

const validationSchema = Yup.object({
    email : Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password : Yup.string().min('8').required('Please enter a password with min 8 characters')
})
const LogIn = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const logInUser = async ({ email, password }) => {
        try {
            setLoading(true)
            const { data } = await apis.login({ email: email.toLocaleLowerCase(), password });
            await localStorage.setItem('AUTH_TOKEN', data.token)
            console.log('Success');
            history.push(routePaths.homescreen)
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
                        {(errors.email && touched.email) && <div> <div className = 'text-danger text-center'>{errors.email}</div> <br></br></div>}
                        <div className = 'form-group'>
                            <label>Password</label>
                                <div class="input-group">
                                    <input name="password" type="password" class="form-control" id="password" value = {values.password} onChange = {handleChange} onBlur = {handleBlur}/>
                                    <div class="input-group-append">
                                        <span className = 'input-group-text' onClick = {password_show_hide}> 
                                        <i class="fas fa-eye" id="show_eye"></i>
                                        <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        {(errors.password && touched.password) && <div><div className = 'text-danger text-center'>{errors.password}</div> <br></br> </div>}
                        <div className = 'row justify-content-center align-items-center'>
                            <button className = 'btn btn-dark' type = 'submit'>Login</button>
                        </div>
                        </form>
                        )}
                        </Formik>
                    </div>
                    <br></br>
                    <Link to = {routePaths.signup}>
                        <div className = 'text-center'>Do not have an account? Sign up</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn
