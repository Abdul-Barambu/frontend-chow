import React, { useState, useEffect } from 'react'
import './VendorProfile.css'
import Img from '../../../assets/logo.png'
import ProfileImg from '../../../assets/profile-img.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const VendorProfile = () => {

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const [clickedHome, setClickedHome] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedOrder, setClickedOrder] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const changePassword = { oldPassword, newPassword }
    const userName = { username }
    const Email = { email }
    const history = useHistory();


    // Auth
    const accessToken = localStorage.getItem("Access-Token-vendor");
    const refreshToken = localStorage.getItem("Refresh-Token");
    const vendorUsername = localStorage.getItem("vendor-username");

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookies: `refreshToken=${refreshToken}`,
    };


    let coloredHome = [];
    let coloredOrder = [];
    let coloredMenu = [];
    let coloredSettings = [];
    let coloredWithdrawal = [];

    if (clickedHome) {
        coloredHome.push('menu-items-color')
    } else {
        coloredHome.push('menu-items')
    }

    if (clickedOrder) {
        coloredOrder.push('menu-items-color')
    } else {
        coloredOrder.push('menu-items')
    }

    if (clickedMenu) {
        coloredMenu.push('menu-items-color')
    } else {
        coloredMenu.push('menu-items')
    }

    if (clickedSettings) {
        coloredSettings.push('menu-items-color')
    } else {
        coloredSettings.push('menu-items')
    }

    if (clickedWithdrawal) {
        coloredWithdrawal.push('menu-items-color')
    } else {
        coloredWithdrawal.push('menu-items')
    }


    const handleClickedHome = () => {
        setClickedHome(true)
        setClickedOrder(false)
        setClickedMenu(false)
        setClickedSettings(false)
        history.push("/vendor-dashboard")
    }
    const handleClickedOrder = () => {
        setClickedHome(false)
        setClickedOrder(true)
        setClickedMenu(false)
        setClickedSettings(false)
    }
    const handleClickedMenu = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(true)
        setClickedSettings(false)
        history.push("/vendor-menu")
    }
    const handleClickedSettings = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(false)
        setClickedSettings(true)
        history.push("/vendor-profile")
    }

    const handleClickedWithdrawal = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(false)
        setClickedSettings(false)
        setClickedWithdrawal(true)
        history.push("/vendor-withdrawal")
    }

    useEffect(() => {
        setClickedSettings(true)
    }, [])

    const handleChanges = (e) => {
        e.preventDefault()
        axios.post('https://chow.onrender.com/api/v1/changeUserName', userName, { headers })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Username Changed',
                    text: `Your Username has been Successfully Changed to ${username}`
                })
            }).catch(e => {
                console.log(e)
            })

        axios.post('https://chow.onrender.com/api/v1/changeUserEmail', Email, { headers })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Email Changed',
                    text: `Your Email has been Successfully Changed to ${email}`
                })
            }).catch(e => {
                console.log(e)
            })

        axios.post('https://chow.onrender.com/api/v1/changeUserPassword', changePassword, { headers })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed',
                    text: `Your Password has been Successfully Changed`
                })
            }).catch(e => {
                console.log(e)
            })
    }


    const out = () => {
        localStorage.removeItem("Refresh-Token-vendor");
        localStorage.removeItem("Access-Token-vendor");
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: 'Logged Out Successfully'
        });
        history.push("/")
    }

    return (
        <div>
            <div className="vendor-container-profile">
                <div className="container-vendor-navbar">
                    <div className="logo-img-vendor">
                        <img src={Img} alt="logo img" style={{ cursor: 'pointer' }} className='logo-img-dashboard' />
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>

                {/* Main body */}
                <div className="vendor-dashboard-body">
                    <Grid container spacing={3}>
                        <Grid item lg={3} md={3} sm={3} padding={0} >
                            <div className="nav-menu">
                                <div className={coloredHome} onClick={handleClickedHome}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><AiFillHome /></span>
                                        <span className="menu-text-dash">Home</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-dash">Analysis, order report, etc...</span>
                                    </div>
                                </div>
                                <div className={coloredOrder} onClick={handleClickedOrder}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><MdRestaurantMenu /></span>
                                        <span className="menu-text-dash">Order</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-order-dash">Your previous orders</span>
                                    </div>
                                </div>
                                <div className={coloredMenu} onClick={handleClickedMenu}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><BsDashCircleDotted /></span>
                                        <span className="menu-text-dash">Menu</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-menu-dash">Manage your product, pricing, etc</span>
                                    </div>
                                </div>
                                <div className={coloredWithdrawal} onClick={handleClickedWithdrawal}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><BiMoneyWithdraw /></span>
                                        <span className="menu-text-dash">Withdrawal</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-setting-dash">Manage your withdrawal</span>
                                    </div>
                                </div>
                                <div className={coloredSettings} onClick={handleClickedSettings}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><RiListSettingsLine /></span>
                                        <span className="menu-text-dash">Profile Setting</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-setting-dash">Manage your account</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={9} md={9} sm={9} xs={12}>
                            <div className="vendor-dashboard">
                                <div className="dashboard-text">
                                    <span className="dash-text">Profile</span> <br />
                                    <span className="profile-date">{vendorUsername}</span>
                                </div>
                            </div>

                            {/* profile */}
                            <div className="profle-cart-container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="profile-contents">
                                            <div className="profile-info-logout">
                                                <div className="profile-info">
                                                    <img src={ProfileImg} alt="profile-img" className="profile-info-img" />
                                                    <div className="profile-paras">
                                                        <p className="profile-info-name">{vendorUsername}</p>
                                                        <p className="profile-info-date">{date} - {time}</p>
                                                    </div>
                                                </div>
                                                <div className="profile-vendor-logout">
                                                    <button className="logout-ven-btn" onClick={out}>Logout</button>
                                                </div>
                                            </div>
                                            <div className='bottom-line bottom-line-ven-profile' style={{ bottom: '0' }}></div>
                                            <div className="profile-form-setting">
                                                <form onSubmit={handleChanges}>
                                                    <Grid container spacing={2}>
                                                        <Grid lg={6} md={6} sm={6} xs={12}>
                                                            <div className="mb-3 input-div">
                                                                <label htmlFor="username" className="form-label label-text-profile">Username</label>
                                                                <input type="text" style={{ border: "1.5px solid black" }}
                                                                    className="form-control profile-input-vendor"
                                                                    id="username"
                                                                    placeholder="Okomayin Onaivi"
                                                                    name='username'
                                                                    value={username}
                                                                    onChange={e => setUsername(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-3 input-div">
                                                                <label htmlFor="email" className="form-label label-text-profile">Email</label>
                                                                <input type="email" style={{ border: "1.5px solid black" }}
                                                                    className="form-control profile-input-vendor"
                                                                    id="email"
                                                                    placeholder="Onaivi@gmail.com"
                                                                    name='email'
                                                                    value={email}
                                                                    onChange={e => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </Grid>

                                                        <Grid lg={6} md={6} sm={6} xs={12}>
                                                            <div className="mb-3 input-div-pass">
                                                                <label htmlFor="old-password" className="form-label label-text-profile">Old Password</label>
                                                                <input type="password" style={{ border: "1.5px solid black" }}
                                                                    className="form-control profile-input-vendor"
                                                                    id="old-password"
                                                                    placeholder="**********"
                                                                    name='oldPassword'
                                                                    value={oldPassword}
                                                                    onChange={e => setOldPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-3 input-div-pass">
                                                                <label htmlFor="new-password" className="form-label label-text-profile">New Password</label>
                                                                <input type="password" style={{ border: "1.5px solid black" }}
                                                                    className="form-control profile-input-vendor"
                                                                    id="nee-password"
                                                                    placeholder="**********"
                                                                    name='newPassword'
                                                                    value={newPassword}
                                                                    onChange={e => setNewPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="save-btn">
                                                                <button className='btn btn-danger save-btn-profile'>Save changes</button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid >
                    </Grid >
                </div >

            </div >

            {/* Nav */}
            <nav>
                {/* Home */}
                <a href='#' onClick={() => {
                    setActiveNav('#')
                    handleClickedHome()
                }} className={activeNav === '#' ? 'active' : ''}><AiFillHome />
                    {/* <span onClick={() => setActiveNav('#')} className={activeNav === '#' ? '' : 'none'}>Home</span> */}
                </a>

                {/* Search */}
                <a href='#a' onClick={() => {
                    setActiveNav('#a')
                    handleClickedOrder()
                }} className={activeNav === '#a' ? 'active' : ''}><MdRestaurantMenu />
                    {/* <span onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : 'none'}>Order</span> */}
                </a>

                {/* Cart */}
                <a href='#b' onClick={() => {
                    setActiveNav('#b')
                    handleClickedMenu()
                }} className={activeNav === '#b' ? 'active' : ''}><BsDashCircleDotted />
                    {/* <span onClick={() => { setActiveNav('#b') }} className={activeNav === '#b' ? 'active' : 'none'}>Menu</span> */}
                </a>

                {/* Cart */}
                <a href='#d' onClick={() => {
                    setActiveNav('#d')
                    handleClickedWithdrawal()
                }} className={activeNav === '#d' ? 'active' : ''}><BiMoneyWithdraw />
                    {/* <span onClick={() => { setActiveNav('#d') }} className={activeNav === '#d' ? 'active' : 'none'}>withdrawal</span> */}
                </a>

                {/* Profile */}
                <a href='#c' onClick={() => {
                    setActiveNav('#c')
                    handleClickedSettings()
                }} className={activeNav === '#c' ? 'active' : ''}><RiListSettingsLine />
                    {/* <span onClick={() => { setActiveNav('#c') }} className={activeNav === '#c' ? 'active' : 'none'}>Profile</span> */}
                </a>
            </nav>
        </div >
    )
}

export default VendorProfile
