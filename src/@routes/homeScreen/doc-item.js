import React, { useState } from 'react'
//import CarouselItems from './carouselItems'
import './index.css'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getAge } from '../../@components'
const carouselProp = {
    showStatus: false,
    useKeyboardArrows: true,
    infiniteLoop: true,
    autoPlay: true,
    stopOnHover: true,
    emulateTouch: true,
    transitionTime: 400,
    showArrows: true,
    showThumbs: false,
    renderArrowPrev: (clickHandler, hasPrev, label) => {
        return (
            <span className="arrow-left" onClick={clickHandler}>
                <span className="icon-keyboard_arrow_left">&#8249;</span>
            </span>
        )
    },
    renderArrowNext: (clickHandler, hasNext, label) => {
        return (
            <span className="arrow-right" onClick={clickHandler}>
                <span className="icon-keyboard_arrow_right">&#8250;</span>
            </span>
        )
    },
}
const DocItem = ({ item }) => {
    const [showMore, setShowMore] = useState(false);
    const dob = item.user.dateOfBirth

    if (item.files) {
        if (item.files.length === 1) {
            return (
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='mt-3 col-lg-8 col-md-8'>
                            <div className='image-wrapper'>
                                <a href={item.files[0]}>
                                    <img className='home-img' src={item.files[0]}></img>
                                </a>
                            </div>
                            <div className='row main align-items-center'>
                                <div className='mt-3 col-12'>
                                    <h5 className='des'>Description: </h5>
                                    {showMore ? <div className='responsive-content-des'>{item.description}</div> : <div className='responsive-content-des'>{item.description.substring(0, 50)}</div>}
                                    {(item.description.length > 50) &&
                                        <p className='ref' onClick={() => setShowMore(!showMore)}>{showMore ? <div className='responsive-content-des'> Show less</div> : <div className='responsive-content-des'> ...Show more</div>}</p>}
                                </div>
                            </div>
                            <div className='row main'>
                                <div className='col text-muted responsive-content-des'>Created At:</div>
                                <div className='col text-muted responsive-content-des'>{item.createdAt}</div>
                            </div>
                            <div className='row main'>
                                <div className='col text-muted responsive-content-des'>Age at this time:</div>
                                <div className='col text-muted responsive-content-des'>{getAge(dob)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (item.files.length > 1) {
            return (
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='mt-3 col-lg-8 col-md-8'>
                            <Carousel {...carouselProp}>
                                {
                                    item.files.map(file => {
                                        return (
                                            <div className='image-wrapper'>
                                                <img className='home-img' src={file} />
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                            <div className='row main align-items-center'>
                                <div className='mt-3 col-12'>
                                    <h5 className='des'>Description: </h5>
                                    {showMore ? <div className='responsive-content-des'>{item.description}</div> : <div className='responsive-content-des'>{item.description.substring(0, 50)}</div>}
                                    {(item.description.length > 50) &&
                                        <p className='ref' onClick={() => setShowMore(!showMore)}>{showMore ? <div className='responsive-content-des'> Show less</div> : <div className='responsive-content-des'> ...Show more</div>}</p>}
                                </div>
                            </div>
                            <div className='row main'>
                                <div className='col text-muted responsive-content-des'>Created At:</div>
                                <div className='col text-muted responsive-content-des'>{item.createdAt}</div>
                            </div>
                            <div className='row main'>
                                <div className='col text-muted responsive-content-des'>Age at this time:</div>
                                <div className='col text-muted responsive-content-des'>{getAge(dob)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <div></div>
        )
    }
}


export default DocItem

