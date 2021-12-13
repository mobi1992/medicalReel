import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { apis, routePaths } from '../../@services'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import { password_show_hide, confirmPassword_show_hide } from '../../@components'
import { Container, Col, Row, Card, Form, InputGroup, Button } from 'react-bootstrap'
import img from '../../@assets/images/img.png'

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: ''
}

const formValues = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('This Field is Required'),
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password: Yup.string().min('8').required('Please enter a password with min 8 characters'),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
    dateOfBirth: Yup.string().required('Please select your date of birth')
})
const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const signUp = async ({ name, email, password, dateOfBirth }) => {
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
        catch (err) {
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
        <Container> <Row className='justify-content-center align-items-center'> <Col lg='6' md='8' mx='auto'>
            <Link to={routePaths.login}>
                <div className='mt-4 text-center'>Already have an account? Log in</div>
            </Link>
            <Card className='mt-5'> <Card.Body>
                <Row className='justify-content-center align-items-center'>
                    <img className='card card-img border-0 justify-content-center' style={{ height: '50%', width: '50%' }} src={img} />
                </Row>
                <Formik initialValues={initialValues}
                    onSubmit={signUp}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' id='name' name='name' onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                            {(errors.name && touched.name) && <div> <div className='text-danger text-center'>{errors.name}</div> <br></br></div>}

                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='text' id='email' name='email' onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                            {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control name="password" type="password" id="password" onChange={handleChange} onBlur={handleBlur} />
                                    <InputGroup.Append>
                                        <InputGroup.Text onClick={password_show_hide}>
                                            <i class="fas fa-eye" id="show_eye"></i>
                                            <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                            {(errors.password && touched.password) && <div><div className='text-danger text-center'>{errors.password}</div> <br></br></div>}

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control name="confirmPassword" type="password" id="confirmPassword" onChange={handleChange} onBlur={handleBlur} />
                                    <InputGroup.Append>
                                        <InputGroup.Text onClick={confirmPassword_show_hide}>
                                            <i class="fas fa-eye" id="show_eye2"></i>
                                            <i class="fas fa-eye-slash d-none" id="hide_eye2"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                            {(errors.confirmPassword && touched.confirmPassword) && <div><div className='text-danger text-center'>{errors.confirmPassword}</div> <br></br></div>}

                            <Form.Group>
                                <Form.Label>Select Date of Birth</Form.Label>
                                {/* To disable future dates the max property is used */}
                                <Form.Control type='date' id='dateOfBirth' name='dateOfBirth' onChange={handleChange} onBlur={handleBlur} max={moment().format("YYYY-MM-DD")} />
                            </Form.Group>
                            {(errors.dateOfBirth && touched.dateOfBirth) && <div className='text-danger text-center'>{errors.dateOfBirth}</div>}
                            <div className='mt-4'></div>
                            <Row className='justify-content-center'>
                                <Button variant='dark' type='submit'>Sign Up</Button>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
            </Card>
        </Col>
        </Row>
        </Container>
    )
}

export default SignUp
