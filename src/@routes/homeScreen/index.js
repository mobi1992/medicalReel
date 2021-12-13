import React, { useState, useEffect } from 'react'
import { apis, routePaths } from '../../@services'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from 'react-router-dom'
import { SideBar } from '../../@components'
import DocItem from './doc-item'
import './index.css'
import { Container, Row, Col, Card} from 'react-bootstrap'
const HomeScreen = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        getHomeData();
    }, []);

    const getHomeData = async () => {
        try {
            setLoading(true)
            // if (data1 !== undefined){
            //     const { data: userDocs } = await apis.getUserDoc({ page, userId: data1.id });
            //     console.log(userDocs);
            //     setData(userDocs);
            // }
            const { data: userDocs } = await apis.getUserDoc({ page })
            console.log(userDocs);
            setData(userDocs);

        } catch (e) {
            setLoading(true)
            if (e?.response?.data?.statusCode === 401) {
                await localStorage.removeItem("AUTH_TOKEN");
                history.push(routePaths.login)
                return;
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <SideBar>
                {data.length === 0 && !loading ?
                    <Container>
                        <Row className='justify-content-center align-items-center'>
                            <Col lg='8' md='8' className='mt-5'>
                                <Card className='border-0'><Card.Body>
                                    <h2 className='text-center'>Welcome to MedicalReel</h2>
                                    <div className='text-center'>Please start adding pictures or documents to add to your reel</div>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container> : <div>
                        {
                            data.map(item => (

                                <DocItem item={item} />
                            ))
                        }
                    </div>
                }
            </SideBar>
        </div>
    )
}

export default HomeScreen
