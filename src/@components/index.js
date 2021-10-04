import React, {useEffect} from 'react'
import LogIn from './logIn'
import SignUp from './signUp'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function MainApp() {
    useEffect(() => {
        <Router>
            <Route path = '/' exact component = {LogIn}/>
        </Router>
    }, [])
    return (
        <div>
        <Router>
            <Switch>
                <Route path = '/SignUp' exact component = {SignUp}/>
                <LogIn path = '/' exact component = {LogIn}/>
            </Switch>
        </Router>
        </div>
    )
}

export default MainApp
