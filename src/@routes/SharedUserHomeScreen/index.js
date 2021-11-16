import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from 'react-router-dom'
import { apis, routePaths } from '../../@services'
import Home from './homeScreen'
const SharedUserHomeScreen = ({sharedWithMeList, getSharedWithMeList}) => {
    const {name} = useParams()
    let paramData = sharedWithMeList.filter(list => list.name === name).map(list => list.id)
    useEffect(() => {
        getSharedWithMeList()
    }, []);
    return (
        <div>
            <Home paramData = {paramData}/>
        </div>
    )
}

export default SharedUserHomeScreen
