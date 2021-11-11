import React, { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid'
import { apis } from '../../@services/apis';
import { debounce } from '../../@components'
const Modal = ({ getTheSharingList }) => {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const setTheSearch = (e) => {
        setSearch(e.target.value)
    }
    const onChangeSearch = useMemo(() => debounce(setTheSearch, 1000), []);

    const searchUsers = async () => {
        try {
            setLoading(true)
            const { data } = await apis.getUsers(search)
            console.log(data)
            setSearchResult(data)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    const allowTheSharing = async (id) => {
        try {
            await apis.allowSharing(id);
        } catch (e) {
            if (e?.response?.data?.message === "ALREDAY_SHARED") {
                alert('The Profile is already shared with this user')
            }
        }
        getTheSharingList();
    }
    useEffect(() => {
        search.length && searchUsers();
        console.log(search)
    }, [search]);
    return (
        <div>
            <div style={{ position: 'sticky', float: 'right' }}><span><button data-toggle="modal" data-target="#myModal"><i className="fa fa-plus-circle glyphicon" style={{ color: 'grey' }} aria-hidden="true"></i></button></span></div>
            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Search for a user</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <input type='text' placeholder='Search for a user' className='form-control' onChange={onChangeSearch} />
                        </div>
                        <div className='card card-body border-0'>
                            {
                                searchResult.map(list => {
                                    return (<div>
                                        <div style={{ float: 'left' }}>{list.email}</div>
                                        <div style={{ float: 'right' }}><span data-dismiss="modal" onClick={() => allowTheSharing(list.id)}><i class="fas fa-share"></i></span></div>
                                        <br></br>
                                        <hr></hr>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal
