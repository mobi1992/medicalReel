import React, {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import {apis, routePaths} from '../../@services'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import { password_show_hide , confirmPassword_show_hide} from '../../@components'

const initialValues = {
    name : '',
    email : '',
    password : '',
    confirmPassword : '',
    dateOfBirth : ''
}

const formValues = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name : Yup.string().required('This Field is Required'),
    email : Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password : Yup.string().min('8').required('Please enter a password with min 8 characters'),
    confirmPassword : Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
    dateOfBirth : Yup.string().required('Please select your date of birth')
})
const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const signUp = async ({name, email, password, dateOfBirth}) => {
        try {
            setLoading(true)
            const { data: { success } } = await apis.signup({ name, email: email.toLocaleLowerCase(), password, dateOfBirth })
            if (!success) {
                alert('Something went wrong, please consult our developement team')
            }
            const { data } = await apis.login({ email: email.toLocaleLowerCase(), password });
            await localStorage.setItem("AUTH_TOKEN", data.token)
            history.push(routePaths.login)
            console.log('success')
        }
        catch(err) {
            // the ? operator is for conditional assigning
            if (err?.response?.data?.message === "EMAIL_ALREADY_EXISTS") {
                console.log(err.response.data.message)
                alert('This email is already signed up')
            }
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'col-lg-4 col-md-4 mx-auto'>
                    <Link to = {routePaths.login}>
                        <div className = 'mt-4 text-center'>Already have an account? Log in</div>
                    </Link>
                    <div className = 'mt-4 card card-body'>
                        <Formik initialValues = {initialValues}
                        onSubmit = {signUp}
                        validationSchema = {validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <form onSubmit = {handleSubmit}>
                        <div className = 'form-group'>
                            <label htmlFor = 'name'>Name</label>
                            <input className = 'form-control' type = 'text' id = 'name' name = 'name' value = {values.name} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {(errors.name && touched.name) && <div className = 'text-danger text-center'>{errors.name} <br></br></div>}

                        <div className = 'form-group'>
                            <label htmlFor = 'email'>Email Address</label>
                            <input className = 'form-control' type = 'text' id = 'email' name = 'email' value = {values.email} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {(errors.email && touched.email) && <div className = 'text-danger text-center'>{errors.email} <br></br></div>}
                    
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
                        {(errors.password && touched.password) && <div><div className = 'text-danger text-center'>{errors.password}</div> <br></br></div>}

                        <div className = 'form-group'>
                            <label>Password</label>
                                <div class="input-group">
                                    <input name="confirmPassword" type="password" class="form-control" id="confirmPassword" value = {values.confirmPassword} onChange = {handleChange} onBlur = {handleBlur}/>
                                    <div class="input-group-append">
                                        <span className = 'input-group-text' onClick = {confirmPassword_show_hide}> 
                                        <i class="fas fa-eye" id="show_eye2"></i>
                                        <i class="fas fa-eye-slash d-none" id="hide_eye2"></i>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        {(errors.confirmPassword && touched.confirmPassword) && <div><div className = 'text-danger text-center'>{errors.confirmPassword}</div> <br></br></div>}

                        <div className = 'form-group'>
                            <label htmlFor = 'dateOfBirth'>Select Date of Birth</label>
                            {/* To disable future dates the max property is used */}
                            <input className = 'form-control' type = 'date' id = 'dateOfBirth' name = 'dateOfBirth' value = {values.dateOfBirth} onChange = {handleChange} max={moment().format("YYYY-MM-DD")}></input>
                        </div>
                        {(errors.dateOfBirth && touched.dateOfBirth) && <div className = 'text-danger text-center'>{errors.dateOfBirth}</div>}
                        <div className = 'mt-4'></div>
                        <div className = 'row justify-content-center align-items-center'>
                            <button className = 'btn btn-dark' type = 'submit'>Sign Up</button>
                        </div>
                        </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
