import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
const initialValues = {
    name : '',
    email : '',
    password : '',
    confirmPassword : '',
    dateOfBirth : ''
}

const signUp = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name : Yup.string().required('This Field is Required'),
    email : Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password : Yup.string().min('8').required('Please enter a password with min 8 characters'),
    confirmPassword : Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords do not match')
})
function SignUp() {
    return (
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'col-lg-4 col-md-4 mx-auto'>
                    <div className = 'mt-5 card card-body'>
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
                        <br></br>

                        <div className = 'form-group'>
                            <label htmlFor = 'email'>Email Address</label>
                            <input className = 'form-control' type = 'text' id = 'email' name = 'email' value = {values.email} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.email && touched.email ? <div className = 'text-danger text-center'>{errors.email}</div> : null}
                        <br></br>

                        <div className = 'form-group'>
                            <label htmlFor = 'password'>Password</label>
                            <input className = 'form-control' type = 'text' id = 'password' name = 'password' value = {values.password} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.password && touched.password ? <div className = 'text-danger text-center'>{errors.password}</div> : null}
                        <br></br>

                        <div className = 'form-group'>
                            <label htmlFor = 'confirmPassword'>Confirm Password</label>
                            <input className = 'form-control' type = 'text' id = 'confirmPassword' name = 'confirmPassword' value = {values.confirmPassword} onChange = {handleChange} onBlur = {handleBlur}></input>
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? <div className = 'text-danger text-center'>{errors.confirmPassword}</div> : null}
                        <br></br>
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
