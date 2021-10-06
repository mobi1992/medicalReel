import React, {useEffect} from 'react'
import LogIn from './logIn'
import SignUp from './signUp'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import HomeScreen from './homeScreen'

const MainApp = () => {
    // useEffect(() => {
    //     <Route path = '/' exact component = {LogIn}/>
    // }, [])
    return (
        <div>
        <Router>
            <Switch>
                <Route path = '/SignUp' exact component = {SignUp}/>
                <Route path = '/' exact component = {LogIn}/>
                <Route path = '/HomeScreen' exact component = {HomeScreen}/>
            </Switch>
        </Router>
        </div>
    )
}

export default MainApp
