import React, { useState, useEffect } from 'react'
import { apis } from '../../@services'
import Modal from './modal'

const MySharingSettings = () => {
    const [loading, setLoading] = useState(false)
    const [sharingList, setSharingList] = useState([])
    const [modal, showModal] = useState(false)
    const getTheSharingList = async () => {
        try {
            setLoading(true)
            const { data } = await apis.getSharingList()
            console.log('success')
            console.log(data)
            setSharingList(data)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    const deleteTheSharing = async id => {
        const {data : {success}} = await apis.deleteSharing(id)
        if (success) {
            setSharingList(sharingList.filter(list => list.id !== id))
        }
        //if(success)
    }
    useEffect(() => {
        getTheSharingList()
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='mt-5 col-lg-6 col-md-8 col mx-auto'>
                    <div className='card card-body mb-5'>
                        <h3 className='text-center'>My Sharing List</h3>
                        <hr></hr>
                        {sharingList.length === 0 && !loading ? <div className = 'text-center'>No records found. Your profile is not shared with anyone <br></br>
                            <hr></hr></div> :  <div>
                            {
                                sharingList.map(list => {
                                    return (<div>
                                        <div style={{ float: 'left' }}>{list.sharedTo.email}</div>
                                        <div style={{ float: 'right' }}><span onClick = {()=> deleteTheSharing(list.id)}><i style = {{color : 'red'}} class="fas fa-trash-alt"></i></span></div>
                                        <br></br>
                                        <hr></hr>
                                    </div>)
                                })
                            } </div> 
                        }
                        <footer>
                            <Modal getTheSharingList = {getTheSharingList}/>
                        </footer>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MySharingSettings
