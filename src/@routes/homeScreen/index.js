import React from 'react'
import Navbar from '../navbar'
import Home from './homeScreen'
const HomeScreen = ({data1}) => {
    return (
        <div>
            <Navbar />
            <Home data1 = {data1}/>
        </div>
    )
}

export default HomeScreen
