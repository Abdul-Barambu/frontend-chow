import React, { useEffect, useState } from 'react'
import './VendorDashboard.css'
import Img from '../../../assets/logo.png'
import Normal from '../../../assets/normal.jpg'
import Night from '../../../assets/night.jpg'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import { CiBookmarkMinus } from 'react-icons/ci'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const VendorDashboard = () => {

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const [clickedHome, setClickedHome] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [success, setSuccess] = useState(false)
    const [balances, setBalances] = useState([])
    const history = useHistory();

    const accessToken = localStorage.getItem("Access-Token-vendor");

    const headers = {
        Authorization: `Bearer ${accessToken}`
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
        setClickedWithdrawal(false)
    }
    const handleClickedOrder = () => {
        setClickedHome(false)
        setClickedOrder(true)
        setClickedMenu(false)
        setClickedSettings(false)
        setClickedWithdrawal(false)
        history.push("/vendor-order")
    }
    const handleClickedMenu = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(true)
        setClickedSettings(false)
        setClickedWithdrawal(false)
        history.push("/vendor-menu")
    }
    const handleClickedSettings = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(false)
        setClickedSettings(true)
        setClickedWithdrawal(false)
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
        setClickedHome(true)
    }, [])

    // Vendor balance
    useEffect(() => {
        axios.get("https://api-chow.onrender.com/api/vendors/user", { headers })
            .then(res => {
                console.log(res)
                setBalances(res.data.data.balance)
                localStorage.setItem("Vendor-Balance", res.data.data.balance)
                localStorage.setItem("Total-Ordered", res.data.data.total_orders_served)
            }).catch(e => {
                console.log(e)
            })
    }, [])

    const vendorBalance = localStorage.getItem("Vendor-Balance")
    const totalOrdered = localStorage.getItem("Total-Ordered")

    const handleNormal = (e) => {
        e.preventDefault()
        history.push("/vendor-normal")
    }

    const handleNight = (e) => {
        e.preventDefault()
        history.push("/vendor-night")
    }

    useEffect(() => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000);
    }, [])

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

    const loggedInKeys = Object.keys(localStorage).filter(key => key.startsWith("loggedIn_"));

    useEffect(() => {
        if (loggedInKeys.length > 0) {
            // If there is a unique key, display the success message
            setTimeout(() => {
                // Remove the unique key from localStorage after showing the message
                localStorage.removeItem(loggedInKeys[0]);
            }, 3000);
        }
    }, [loggedInKeys]);

    return (
        <div>
            {loggedInKeys.length > 0 && <div className='success-login'>Logged in successfully</div>}
            <div className='container-vendor-dashboard'>
                <div className="container-vendor-navbar">
                    <div className="logo-img-vendor">
                        <img src={Img} alt="logo img" style={{ cursor: 'pointer' }} className='logo-img-dashboard' />
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>

                {/* Main body */}
                <div className="vendor-dashboard-body">
                    <Grid container spacing={2}>
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
                        <Grid item lg={9} md={9} sm={9} paddingLeft={1.6}>
                            <div className="vendor-dashboard">
                                <div className="dash-out">
                                    <div className="dashboard-text">
                                        <span className="dash-text">Dashboard</span> <br />
                                        <span className="profile-date">{date} - {time}</span>
                                    </div>
                                    <div className="profile-vendor-logout">
                                        <button className="logout-ven-btn" onClick={out}>Logout</button>
                                    </div>
                                </div>
                                <div className='bottom-line-dashboard' style={{ bottom: '0' }}></div>
                                <div className="cart-container">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="total-revenue">
                                                <div className="money-icon"><TbCurrencyNaira className='naira-icon' /></div>
                                                <h2 className='revenue-amount'>₦ {vendorBalance}.00</h2>
                                                <p className="revenue-text">Total Revenue</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="total-dish">
                                                <div className="dish-icon"><CiBookmarkMinus className='bookmark-icon' /></div>
                                                <h2 className='dish-amount'>{totalOrdered}</h2>
                                                <p className="dish-text">Total Dish Ordered</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Orders */}
                                <div className="orders-cart-container">


                                    {/* Bootstrap card */}
                                    <div className="row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card order-normal-card">
                                                <img src={Normal} className="card-img-top" alt="Normal picture" />
                                                <div className="card-body">
                                                    <h3 className="card-title-normal">Today's Orders</h3>
                                                    <p className="card-text-normal-today">Click to view today's normal orders.</p>
                                                    <p className="card-text-normal">View and manage today's orders from your student customers. Deliver delicious meals to brighten their day!</p>
                                                    <button className="btn-normal-card" onClick={handleNormal}>Click me</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card order-normal-card">
                                                <img src={Night} className="card-img-top" alt="night picture" />
                                                <div className="card-body">
                                                    <h3 className="card-title-normal">Night Orders</h3>
                                                    <p className="card-text-normal-today">Click to view today's night orders.</p>
                                                    <p className="card-text-normal">View, prepare and handle late-night orders for students. Keep them fueled during their study sessions!</p>
                                                    <button className="btn-normal-card" onClick={handleNight}>Click me</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Bootstrap card */}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>


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

        </div>
    )
}

export default VendorDashboard
