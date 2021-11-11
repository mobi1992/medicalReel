import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import logo from '../@assets/images/logo.png'
import { routePaths } from '../@services'
import './index.css'
import Setting from './setting'
const Navbar = () => {
    return (
        <div>
            <div className='display-in-small-screens'>
                <nav class="navbar-color">
                    <ul className='ul'>
                        <li className='li'>
                            <a class="navbar-brand" href="#">
                                <img className='max-width' src={logo} alt="logo" />
                            </a>
                        </li>
                        <li className='li'>
                            <Link to={routePaths.homescreen}>
                                <span className='span' data-toggle="tooltip" title="Home">
                                    <i className='fas fa-home glyphicon'></i>
                                </span>
                            </Link>
                        </li>
                        <li className='li'>
                            <Link to={routePaths.addrecord}>
                                <span className='span' data-toggle="tooltip" title="Add Record">
                                    <i class="fa fa-plus-square glyphicon" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </li>
                        <li className='li'>
                            <Link to={routePaths.setting}>
                                <span className='span' data-toggle="tooltip" title="Settings">
                                    <i class="fa fa-cog glyphicon" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav >
            </div>
            <div className='display-in-large-screens'>
                <nav class="navbar navbar-expand-md navbar-expand-sm navbar-expand-xs navbar-expand-lg navbar-color">
                    <a class="navbar-brand" href="#">
                        <img className='max-width' src={logo} alt="logo" />
                    </a>
                    <ul class="nav navbar-nav ml-auto">
                        <li class="nav-item">
                            <div className='ml-5'>
                                <Link to={routePaths.homescreen}>
                                    <span data-toggle="tooltip" title="Home">
                                        <i className='fas fa-home glyphicon'></i>
                                    </span>
                                </Link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className='ml-5'>
                                <Link to={routePaths.addrecord}>
                                    <span data-toggle="tooltip" title="Add Record">
                                        <i class="fa fa-plus-square glyphicon" aria-hidden="true"></i>
                                    </span>
                                </Link>
                            </div>
                        </li>
                        <li class="nav-item seen">
                            <div className='ml-5'>
                                <span>
                                    <i style = {{color : 'blue'}} class="fa fa-cog glyphicon" aria-hidden="true"></i>
                                </span>
                                <Setting />
                            </div>
                        </li>
                    </ul>
                </nav >
            </div>
        </div>
    )
}

export default Navbar
