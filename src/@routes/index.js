import React, { useEffect } from 'react'
import LogIn from './logIn'
import SignUp from './signUp'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import HomeScreen from './homeScreen'
import Settings from './settings'
import AddRecord from './addRecord'
import {routePaths} from '../@services'
import logo from '../@assets/images/logo.png'
import MyProfileSettings from './myProfileSettings'
import MySharingSettings from './mySharingSettings'
import SharedWithMe from './sharedWithMe'
import Navbar from './navbar'
const MainApp = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={routePaths.login} exact component={LogIn} />
                    <Route path={routePaths.signup} exact component={SignUp} />
                    <Route path={routePaths.homescreen} exact component={HomeScreen} />
                    <Route path={routePaths.setting} exact component={Settings} />
                    <Route path={routePaths.addrecord} exact component={AddRecord} />
                    <Route path={routePaths.myprofilesettings} exact component={MyProfileSettings}/>
                    <Route path={routePaths.mysharingsettings} exact component={MySharingSettings}/>
                    <Route path={routePaths.sharedwithme} exact component={SharedWithMe}/>
                </Switch>
            </Router>
        </div>
    )
}

export default MainApp
