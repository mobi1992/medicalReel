import React, {useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
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
const LogIn = () => {

    const password_show_hide = () => {
        var x = document.getElementById('password')
        var show_eye = document.getElementById("show_eye");
        var hide_eye = document.getElementById("hide_eye");
        hide_eye.classList.remove("d-none");
        if (x.type === "password") {
          x.type = "text";
          show_eye.style.display = "none";
          hide_eye.style.display = "block";
        } else {
          x.type = "password";
          show_eye.style.display = "block";
          hide_eye.style.display = "none";
        }
      }

    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const logInUser = async ({ email, password }) => {
        try {
            setLoading(true)
            const { data } = await apis.login({ email: email.toLocaleLowerCase(), password });
            await localStorage.setItem('AUTH_TOKEN', data.token)
            console.log('Success');
            history.push('/HomeScreen')
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
                        {errors.email && touched.email ? <div className = 'text-danger text-center'>{errors.email} <br></br></div> : null}
                        <div className = 'form-group'>
                            <label>Password</label>
                                <div class="input-group">
                                    <input name="password" type="password" class="input form-control" id="password" value = {values.password} onChange = {handleChange} onBlur = {handleBlur}/>
                                    <div class="input-group-append">
                                        <span className = 'input-group-text' onClick = {password_show_hide}> 
                                        <i class="fas fa-eye" id="show_eye"></i>
                                        <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        {errors.email && touched.email ? <div className = 'text-danger text-center'>{errors.email} <br></br></div> : null}
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
