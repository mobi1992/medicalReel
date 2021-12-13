import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, Image, Navbar } from 'react-bootstrap'
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import img from '../../@assets/images/img.png'
import 'react-pro-sidebar/dist/css/styles.css';
import { routePaths } from '../../@services'
import logo from '../../@assets/images/logo.png'
import './index.css'
import AddRecordModal from '../addRecord'
const SideBar = ({children}) => {
    const [collapsedSidebar, setCollapsedSidebar] = useState(false);
    const [hiddenSidebar, setHiddenSidebar] = useState(false);
    const [show, setShow] = useState(false)
    return (
        <Row>
            <ProSidebar breakPoint="md" toggled={hiddenSidebar} collapsed={collapsedSidebar} image="https://www.wptunnel.com/wp-content/uploads/2021/10/wptunnel-medical-wallpaper.jpg" onToggle={() => setHiddenSidebar(!hiddenSidebar)}>
                {!collapsedSidebar && <SidebarHeader>
                    <Row className="p-5 m-0 justify-content-center">
                        <Image style={{ width: '80%', height: '80%' }} src={img} />
                    </Row>
                </SidebarHeader>}
                <SidebarContent>
                    <Menu className="bg-transparent" iconShape="circle">
                        <MenuItem icon={<span> <i className='fas fa-home'></i></span>}>
                            <Link to={routePaths.homescreen}>
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick = {() => setShow(true)} icon={<span> <i className='fas fa-plus-square'></i></span>}>
                                Add Record
                        </MenuItem>
                        <SubMenu title='Settings' icon={<span> <i className='fas fa-cog'></i></span>}>
                            <MenuItem icon={<span> <i className='fas fa-share-square'></i></span>}>
                                <Link to={routePaths.mysharingsettings}>
                                    My Sharing Settings
                                </Link>
                            </MenuItem>
                            <MenuItem icon={<span> <i className='fas fa-share-alt'></i></span>}>
                                <Link to={routePaths.sharedwithme}>
                                    Shared With Me
                                </Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style = {{textAlign:'center'}}>
                    <div className = 'mt-3 mb-3'>
                    <a href=''>
                    <span>
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                    </span>
                    {!collapsedSidebar && <span>  Logout</span>}
                    </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
            <Col className='m-0 p-0 text-left'>
                <Navbar className = 'navbar-color'>
                    {/* Collapsed display on big screens (bigger than md), no collapsed display on small screens (smaller than md) */}
                    <Navbar.Brand bg = 'dark' className = 'd-none d-md-block'>
                        <span onClick = {() => setCollapsedSidebar(!collapsedSidebar)}><i class="fas fa-bars"></i></span>
                        <span><Image src={logo} className = 'max-width pb-1 pl-1' /></span>
                    </Navbar.Brand>
                    {/* Hidden display on small screens (smaller than md), no hidden display on big screens (bigger than md) */}
                    <Navbar.Brand bg = 'dark' className = 'pl-1 d-md-none'>
                        <span onClick = {() => setHiddenSidebar(!hiddenSidebar)}><i class="fas fa-bars"></i></span>
                        <span><Image src={logo} className = 'max-width pb-1 pl-1' /></span>
                    </Navbar.Brand>
                </Navbar>
                <Col className="p-0 m-0">
                    {children}
                </Col>
            </Col>
            <AddRecordModal show = {show} setShow = {setShow}/>
        </Row>
    )
}

export default SideBar
