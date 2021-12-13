import React, { useEffect, useState } from 'react'
import LogIn from './logIn'
import SignUp from './signUp'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import HomeScreen from './homeScreen'
// import Settings from './settings'
// import AddRecord from './addRecord'
import { routePaths } from '../@services'
// import logo from '../@assets/images/logo.png'
// import MyProfileSettings from './myProfileSettings'
// import MySharingSettings from './mySharingSettings'
// import SharedWithMe from './sharedWithMe'
// import Navbar from './navbar'
// import SharedUserHomeScreen from './SharedUserHomeScreen'
import {apis} from '../@services'
const MainApp = () => {
    const [token, setToken] = useState()
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
        const tkn = localStorage.getItem('AUTH_TOKEN')
        setToken(tkn)
    }, [])
    if (token === undefined){
        return null
    }
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {token ? <Redirect to={routePaths.homescreen} /> : <Redirect to={routePaths.login} />}
                    </Route>
                    <Route path={routePaths.login} exact component={LogIn} />
                    <Route path={routePaths.signup} exact component={SignUp} />
                    <Route path={routePaths.homescreen} exact component={HomeScreen} />
                    {/* <Route path={routePaths.setting} exact component={Settings} /> */}
                    {/* <Route path={routePaths.addrecord} exact component={AddRecord} /> */}
                    {/* <Route path={routePaths.myprofilesettings} exact component={MyProfileSettings} /> */}
                    {/* <Route path={routePaths.mysharingsettings} exact component={MySharingSettings} /> */}
                    {/* <Route path={routePaths.sharedwithme} exact render = {() => <SharedWithMe sharedWithMeList = {sharedWithMeList} loading = {loading} getSharedWithMeList = {getSharedWithMeList}/>} /> */}
                    {/* <Route path='/HomeScreen/:name' exact render = {() => <SharedUserHomeScreen sharedWithMeList = {sharedWithMeList} getSharedWithMeList = {getSharedWithMeList}/>} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default MainApp
