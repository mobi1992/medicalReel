import React, { useState, useEffect } from 'react'
import { apis, routePaths } from '../../@services'
import './index.css'
import NavBar from '../navbar'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
const SharedWithMe = () => {
    const history = useHistory()
    const [sharedWithMeList, setSharedWithMeList] = useState([])
    const [loading, setLoading] = useState(true)
    const getSharedWithMeList = async () => {
        try {
            const { data } = await apis.getSharedWithMe()
            console.log(data)
            setSharedWithMeList(data)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSharedWithMeList()
    }, [])
    return (
        <div>
            <NavBar />
            <div className='container'>
                <div className='row'>
                    <div className='mt-5 col-lg-6 col-md-8 col mx-auto'>
                        <div className='card card-body mb-5'>
                            <h3 className='text-center des-heading'>Shared With Me List</h3>
                            <hr></hr>
                            {sharedWithMeList.length === 0 && !loading ? <div className='text-center'>No records found. No one has shared his/her profile with you<br></br>
                                <hr></hr></div> : <div>
                                {
                                    sharedWithMeList.map(list => {
                                        return (<div className='des' onClick={() => history.push({ pathname: `/HomeScreen/${list.name}`, params: list })}>
                                            <div style={{ float: 'left' }}>{list.email}</div>
                                            <div style={{ float: 'right' }}>{list.name}</div>
                                            <br></br>
                                            <hr></hr>
                                        </div>)
                                    })
                                } </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharedWithMe