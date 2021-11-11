import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import { routePaths } from '../@services'

const Setting = () => {
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
        <div class="popover_content">
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
    )
}

export default Setting
