import React, { useState, useEffect } from 'react'
import { apis } from '../../@services'
const SharedWithMe = () => {
    const [sharedWithMeList, setSharedWithMeList] = useState([])
    const [loading, setLoading] = useState(true)
    const getSharedWithMeList = async () => {
        try {
            const { data } = await apis.getSharedWithMe()
            console.log(data)
            setSharedWithMeList(data)
        }
        catch(e) {
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
        <div className='container'>
            <div className='row'>
                <div className='mt-5 col-lg-6 col-md-8 col mx-auto'>
                    <div className='card card-body mb-5'>
                        <h3 className='text-center'>My Sharing List</h3>
                        <hr></hr>
                        {sharedWithMeList.length === 0 && !loading ? <div className = 'text-center'>No records found. No one has shared his/her profile with you<br></br>
                            <hr></hr></div> :  <div>
                            {
                                sharedWithMeList.map(list => {
                                    return (<div>
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
    )
}

export default SharedWithMe
