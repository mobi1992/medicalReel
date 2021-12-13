import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'
import { getAge } from '../../@components'
import './index.css'

const DocItem = ({ item }) => {
    const [crsPic, showCrsPic] = useState(false)
    const [pic, showPic] = useState(false)
    const [showMore, setShowMore] = useState(false);
    const dob = item.user.dateOfBirth

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        //React-bootstrap carousel has an indexing error that causes blank slides 
        //(probably happens when you customize it). 
        //You need to account for it in this callback...
        //adjust index to 0 if selectedIndex is greater than index of last slide or 
        //it is less than zero
        //remember slide indexes are zero-based
        if (selectedIndex >= item.files.length || selectedIndex < 0) {
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


    if (item.files) {
        if (item.files.length === 1) {
            return (
                <Container>
                    <Row className='justify-content-center align-items-center'>
                        <Col lg='8' md='8' className='mt-3'>
                            <div className='image-wrapper'>
                                <img className='home-img' src={item.files[0]} onClick={() => showPic(true)}></img>
                            </div>
                            <Row className='main align-items-center'>
                                <Col className='mt-3'>
                                    <h5 className='des'>Description: </h5>
                                    {showMore ? <div className='responsive-content-des'>{item.description}</div> : <div className='responsive-content-des'>{item.description.substring(0, 50)}</div>}
                                    {(item.description.length > 50) &&
                                        <p className='ref' onClick={() => setShowMore(!showMore)}>{showMore ? <div className='responsive-content-des'> Show less</div> : <div className='responsive-content-des'> ...Show more</div>}</p>}
                                </Col>
                            </Row>
                            <Row className='main'>
                                <Col className='text-muted responsive-content-des'>Created At:</Col>
                                <Col className='text-muted responsive-content-des'>{item.createdAt}</Col>
                            </Row>
                            <Row className='main'>
                                <Col className='text-muted responsive-content-des'>Age at this time:</Col>
                                <Col className='col text-muted responsive-content-des'>{getAge(dob)}</Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            )
        }

        if (item.files.length > 1) {
            return (
                <Container className='container'>
                    <Row className='justify-content-center align-items-center'>
                        <Col lg='8' md='8' className='mt-3'>
                            <Carousel nextIcon={nextIcon()} prevIcon={prevIcon()} indicators={false} interval={3000} activeIndex={index} onSelect={handleSelect}>
                                {
                                    item.files.map(file => {
                                        return (<Carousel.Item>
                                            <div className='image-wrapper'>
                                                <img className='home-img' src={file} />
                                            </div>
                                            </Carousel.Item>
                                        )
                                    })
                                }
                                <ul className='carousel-indicators'>
                                    {item.files.map((item, itemIndex) => {
                                        return (
                                            <li
                                                onClick={() => handleSelect(itemIndex, null)}
                                                className={((itemIndex === index) ? "active" : "") + " " + item.itemIndicatorClass} />
                                        );
                                    })}
                                </ul>
                            </Carousel>
                            <Row className='main align-items-center'>
                                <Col className='mt-3'>
                                    <h5 className='des'>Description: </h5>
                                    {showMore ? <div className='responsive-content-des'>{item.description}</div> : <div className='responsive-content-des'>{item.description.substring(0, 50)}</div>}
                                    {(item.description.length > 50) &&
                                        <p className='ref' onClick={() => setShowMore(!showMore)}>{showMore ? <div className='responsive-content-des'> Show less</div> : <div className='responsive-content-des'> ...Show more</div>}</p>}
                                </Col>
                            </Row>
                            <Row className='main'>
                                <Col className='text-muted responsive-content-des'>Created At:</Col>
                                <Col className='text-muted responsive-content-des'>{item.createdAt}</Col>
                            </Row>
                            <Row className='main'>
                                <Col className='text-muted responsive-content-des'>Age at this time:</Col>
                                <Col className='text-muted responsive-content-des'>{getAge(dob)}</Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* {
                        crs_pic ? <OpenCarouselPic onCloseCrsPic={onCloseCrsPic} item={item} /> : null
                    } */}
                </Container>
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
