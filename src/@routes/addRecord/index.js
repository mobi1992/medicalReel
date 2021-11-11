import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Formik } from 'formik'
import { apis } from '../../@services'
import * as Yup from 'yup'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import Navbar from '../navbar'
const AddRecord = () => {
    let refToButton = React.createRef()
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
        <div>
            <Navbar />
            <div class='row justify-content-center'><div className='mt-5 col-lg-4 col-md-4 col-sm-8 pos-rlv'><div className='card card-body'>
                {imagesAdd ? <div>
                    <Carousel showThumbs={false}>
                        {images.slider_images.map(file => {
                            return (<div className='image-wrapper'>
                                <img className='home-img' src={URL.createObjectURL(file)} />
                            </div>
                            )
                        })
                        }
                    </Carousel>
                    <Formik initialValues={initialValues}
                        onSubmit={postData}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                                <div class="form-group purple-border">
                                    <textarea className='form-control' id='text' rows='3' value={values.text} placeholder='Add Description' onChange={handleChange} onBlur={handleBlur}></textarea>
                                </div>
                                {errors.text && touched.text ? <div className='text-danger text-center'>{errors.text}</div> : null}
                                <br></br>
                                <button className='btn btn-dark btn-block' type='submit'>Post To Reel</button>
                            </form>
                        )}
                    </Formik>
                    <br></br>
                </div> : null
                }
                <input multiple type='file' accept="image/*" style={{ display: 'none' }} onChange={selectImages} ref={refToBtn => refToButton = refToBtn}></input>
                <button className='btn btn-dark' onClick={() => refToButton.click()}>Select The Images</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default AddRecord