import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import HomeScreen from '../homeScreen'
const SharedUserHomeScreen = () => {
    const history = useHistory()
    const data1 = history.location.params
    console.log(data1)
    return (
        <div>
            <HomeScreen data1 = {data1}/>
        </div>
    )
}

export default SharedUserHomeScreen
