import React, {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import {apis} from '../../@services'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

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
function SignUp() {
    const [loading, setLoading] = useState(false)
    const signUp = async ({name, email, password, dateOfBirth}) => {
        try {
            setLoading(true)
            const { data: { success } } = await apis.signup({ name, email: email.toLocaleLowerCase(), password, dateOfBirth })
            if (!success) {
                alert('Something went wrong, please consult our developement team')
            }
            const { data } = await apis.login({ email: email.toLocaleLowerCase(), password });
            await localStorage.setItem("AUTH_TOKEN", data.token)
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
                    <Link to = '/'>
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
                        {errors.name && touched.name ? <div className = 'text-danger text-center'>{errors.name}</div> : null}
                        {errors.name && touched.name ? <br></br> : null}

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

                        <div className = 'form-group'>
                            <label htmlFor = 'confirmPassword'>Confirm Password</label>
                            <input className = 'form-control' type = 'text' id = 'confirmPassword' name = 'confirmPassword' value = {values.confirmPassword} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? <div className = 'text-danger text-center'>{errors.confirmPassword}</div> : null}
                        {errors.confirmPassword && touched.confirmPassword ? <br></br> : null}

                        <div className = 'form-group'>
                            <label htmlFor = 'dateOfBirth'>Select Date of Birth</label>
                            {/* To disable future dates the max property is used */}
                            <input className = 'form-control' type = 'date' id = 'dateOfBirth' name = 'dateOfBirth' value = {values.dateOfBirth} onChange = {handleChange} max={moment().format("YYYY-MM-DD")}></input>
                        </div>
                        {errors.dateOfBirth && touched.dateOfBirth ? <div className = 'text-danger text-center'>{errors.dateOfBirth}</div> : null}
                        <div className = 'mt-4'></div>
                        <button className = 'btn btn-dark' type = 'submit'>Sign Up</button>
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
