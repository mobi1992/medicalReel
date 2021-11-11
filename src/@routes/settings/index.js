import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import { routePaths } from '../../@services'

const Settings = () => {
    const history = useHistory()
    const logout = async () => {
        await localStorage.removeItem("AUTH_TOKEN");
        history.push(routePaths.login);
    }

    const myProfSettings = () => {
        history.push(routePaths.myprofilesettings)
    }

    const mysharingSettings = () => {
        history.push(routePaths.mysharingsettings)
    }

    const sharedwithMe = () => {
        history.push(routePaths.sharedwithme)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='mt-5 col'>
                    <ul style={{ listStyle: 'none' }}>
                            <li onClick={myProfSettings}>
                                <span>
                                    <i class="fa fa-user" aria-hidden="true"></i><p style={{ display: 'inline', cursor: 'default' }}> Your Profile Settings</p>
                                </span>
                            </li>
                        <hr></hr>

                            <li onClick={mysharingSettings}>
                                <span>
                                    <i class="fas fa-share-square"></i><p style={{ display: 'inline', cursor: 'default' }}> My Sharing Settings</p>
                                </span>
                            </li>
                        <hr></hr>
                    
                            <li onClick={sharedwithMe}>
                                <span>
                                    <i class="fa fa-share-alt" aria-hidden="true"></i><p style={{ display: 'inline', cursor: 'default' }}> Shared with me</p>
                                </span>
                            </li>
                        <hr></hr>
                        <li onClick={logout}>
                            <span>
                                <i class="fa fa-power-off" aria-hidden="true"></i><p style={{ display: 'inline', cursor: 'default' }}> Log out</p>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Settings
