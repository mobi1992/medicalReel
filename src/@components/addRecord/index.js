import React, { useState, useRef } from 'react'
// import { Carousel } from 'react-responsive-carousel'
import { Formik } from 'formik'
import { apis } from '../../@services'
import * as Yup from 'yup'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import { SideBar } from '../../@components'
import { Container, Row, Col, Card, Form, Button, Carousel, Modal } from 'react-bootstrap'
const AddRecordModal = ({ show, setShow }) => {
    let refToButton = React.createRef()
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        //React-bootstrap carousel has an indexing error that causes blank slides 
        //(probably happens when you customize it). 
        //You need to account for it in this callback...
        //adjust index to 0 if selectedIndex is greater than index of last slide or 
        //it is less than zero
        //remember slide indexes are zero-based
        if (selectedIndex >= images.slider_images.length || selectedIndex < 0) {
            setIndex(0);
        } else if (selectedIndex !== index) {
            setIndex(selectedIndex);
        }
    };
    const prevIcon = () => {
        return (
            <span>
                <i style={{ color: 'white', fontSize: 'bold' }} class="fas fa-chevron-circle-left"></i>
            </span>
        )
    }
    const nextIcon = () => {
        return (
            <span>
                <i class="fas fa-chevron-circle-right"></i>
            </span>
        )
    }
    const initialState = {
        slider_images: []
    }
    const initialValues = {
        text: ''
    }
    const validationSchema = Yup.object({
        text: Yup.string().required('This Field is Required'),
    })
    const [imagesAdd, setImagesAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState(initialState)
    const selectImages = (e) => {
        setImages({ ...images, slider_images: [...e.target.files] })
        setImagesAdd(true)
    }
    const postData = async (values) => {
        const URL_images = images.slider_images.map(image => {
            return URL.createObjectURL(image)
        })
        console.log(images)
        console.log(URL_images)
        const description = values.text
        console.log(description)
        const formData = new FormData();
        images.slider_images.forEach(img => formData.append('files', img))
        formData.append('description', description)
        console.log(Object.fromEntries(formData))

        try {
            setLoading(true)
            const { data } = await apis.createUserDoc(formData);
            console.log('success')
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Choose From Your System</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {imagesAdd && <div>
                    {images.slider_images.length === 1 ? <div className='image-wrapper'>
                        <img className='home-img' src={URL.createObjectURL(images.slider_images[0])} />
                    </div> : <div>
                        <Carousel nextIcon={nextIcon()} prevIcon={prevIcon()} indicators={false} interval={3000} activeIndex={index} onSelect={handleSelect}>
                            {images.slider_images.map((item) => {
                                return (<Carousel.Item>
                                    <div className='image-wrapper'>
                                        <img className='home-img' src={URL.createObjectURL(item)} />
                                    </div>
                                </Carousel.Item>
                                )
                            })
                            }
                            <ul className = 'carousel-indicators'>
                            {images.slider_images.map((item, itemIndex) => {
                                return (
                                    <li
                                        onClick={() => handleSelect(itemIndex, null)}
                                        className={((itemIndex === index) ? "active" : "") + " " + item.itemIndicatorClass} />
                                );
                            })}
                        </ul>
                        </Carousel>
                    </div>}
                    <Formik initialValues={initialValues}
                        onSubmit={postData}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="purple-border">
                                    <Form.Control as='textarea' id='text' rows={3} value={values.text} placeholder='Add Description' onChange={handleChange} onBlur={handleBlur}></Form.Control>
                                </Form.Group>
                                {errors.text && touched.text ? <div className='text-danger text-center'>{errors.text}</div> : null}
                                <br></br>
                                <Row className='justify-content-center'>
                                    <Button variant='dark btn-block' type='submit'>Post To Reel</Button>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                    <br></br>
                </div>
                }
                {/* refToButton is created so that when we click on button, it should browse for the files */}
                <Form.Control multiple type='file' accept="image/*" style={{ display: 'none' }} onChange={selectImages} ref={refToBtn => refToButton = refToBtn}></Form.Control>
                <Row className='justify-content-center'>
                    <Button variant='dark btn-block' onClick={() => refToButton.click()}>Select The Images</Button>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default AddRecordModal
