import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import { apis } from '../../@services'
import { password_show_hide } from '../../@components'
import { routePaths } from '../../@services'
import { Container, Col, Row, Card, Form, InputGroup, Button } from 'react-bootstrap'
import img from '../../@assets/images/img.png'
const initialValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password: Yup.string().min('8').required('Please enter a password with min 8 characters')
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
        catch (err) {
            console.log('Error', err)
            alert('Email or password is invalid')
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Container>
            <Row className='justify-content-center align-items-center'> <Col lg='4' md='4' mx='auto'>
                <Card className='mt-5'> <Card.Body>
                    <Row className='justify-content-center align-items-center'>
                        <img className='card card-img border-0 justify-content-center' style={{ height: '50%', width: '50%' }} src={img} />
                    </Row>
                    <Formik initialValues={initialValues}
                        onSubmit={logInUser}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control name='email' type='email' id='email' placeholder='Enter Email' onChange={handleChange} onBlur={handleBlur}></Form.Control>
                                </Form.Group>
                                {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control name="password" type="password" class="form-control" id="password" onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Append>
                                            <InputGroup.Text onClick={password_show_hide}>
                                                <i class="fas fa-eye" id="show_eye"></i>
                                                <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                {(errors.password && touched.password) && <div><div className='text-danger text-center'>{errors.password}</div> <br></br> </div>}
                                <Row className='justify-content-center'>
                                    <Button variant='dark' type='submit'>Login</Button>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
                </Card>
                <br></br>
                <Link to={routePaths.signup}>
                    <div className='text-center'>Do not have an account? Sign up</div>
                </Link>
            </Col>
            </Row>
        </Container>
    )
}

export default LogIn
