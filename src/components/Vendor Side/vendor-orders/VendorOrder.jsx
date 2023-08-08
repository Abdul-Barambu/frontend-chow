import React, { useState, useEffect } from 'react'
import './VendorOrder.css'
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { MdOutlineCancel } from "react-icons/md"
import { BsChevronLeft } from "react-icons/bs"
import { BsChevronRight } from "react-icons/bs"
import axios from 'axios'

const VendorOrder = () => {

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const [clickedHome, setClickedHome] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedOrder, setClickedOrder] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [modal, setModal] = useState(false)
    const [packOrders, setPackOrders] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const history = useHistory();


    // Auth
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
        setClickedOrder(true)
    }, [])


    // Get All Orders
    // useEffect(() => {
    //     axios.get(`https://api-chow.onrender.com/api/orders?page_number=1`, { headers })
    //         .then(response => {
    //             console.log(response.data.data.orders)
    //             console.log(response.data.data.page_number)
    //             console.log(response.data.data.total_pages)
    //             localStorage.setItem("page-number", response.data.data.page_number)
    //             localStorage.setItem("total-pages", response.data.data.total_pages)
    //             setLoading(true)
    //             setOrders(response.data.data.orders)
    //         }).catch(e => {
    //             console.log(e)
    //             setLoading(false)
    //         })
    // }, [])

    // const handleNext = (e) => {
    //     e.preventDefault()
    //     axios.get(`https://api-chow.onrender.com/api/orders?page_number=2`, { headers })
    //     .then(response => {
    //         console.log(response.data.data.orders)
    //         localStorage.setItem("page-number", response.data.data.page_number)
    //         localStorage.setItem("total-pages", response.data.data.total_pages)
    //         setLoading(true)
    //         setOrders(response.data.data.orders)
    //     }).catch(e => {
    //         console.log(e)
    //         setLoading(false)
    //     })
    // }


    // Fetch orders based on the given page number
    const fetchOrders = (page) => {
        axios.get(`https://api-chow.onrender.com/api/orders?page_number=${page}`, { headers })
            .then(response => {
                console.log(response.data.data.orders);
                console.log(response.data.data.page_number);
                console.log(response.data.data.total_pages);
                setLoading(true);
                setOrders(response.data.data.orders);
                setPageNumber(response.data.data.page_number); // Update the current page number
                localStorage.setItem("page-number", response.data.data.page_number);
                localStorage.setItem("total-pages", response.data.data.total_pages);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders(pageNumber); // Fetch orders for the initial page
    }, [pageNumber]); // Fetch orders whenever the page number changes

    const handleNext = (e) => {
        e.preventDefault();
        const nextPage = pageNumber + 1;
        fetchOrders(nextPage); // Fetch orders for the next page
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        const nextPage = pageNumber - 1;
        fetchOrders(nextPage); // Fetch orders for the next page
    };



    // show packs
    const handlePacks = (_id) => {
        console.log(_id)
        axios.get(`https://api-chow.onrender.com/api/orders/no/${_id}`, { headers })
            .then(response => {
                console.log(response)
                setPackOrders(response.data.data)
                setModal(true)
            })
            .catch(e => {
                console.log(e)
            })
    }
    // cancel
    const handleCancel = () => {
        setModal(false)
    }

    const pagenumber = localStorage.getItem("page-number")
    const totalPages = localStorage.getItem("total-pages")

    return (
        <div>
            <div className="container-vendor-order">
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
                                    <span className="dash-text">Orders</span> <br />
                                    <span className="profile-date">{date} - {time}</span>
                                </div>
                                {/* Orders */}
                                <div className="orders-cart-container">
                                    <div className="row">
                                        {/* Normal order */}
                                        <div className="col-lg-12 col-md-12" style={{ padding: 0 }}>
                                            <div className="normal-order">
                                                <h2 className="normal-text">All Orders</h2>
                                                <div className="order-menu-text">
                                                    <span className="order-text-menu">Customer</span>
                                                    <span className="order-text-menu">Order</span>
                                                    <span className="order-text-menu">Total Payment</span>
                                                    <span className="order-text-menu">Time</span>
                                                </div>
                                                <div className='bottom-line-normal' style={{ bottom: '0' }}></div>
                                                {
                                                    loading ? (
                                                        <div>
                                                            {
                                                                orders.map(order => (
                                                                    <div key={order._id} className="order-menu-list"
                                                                        onClick={() => handlePacks(order.orderId)}
                                                                        style={{ cursor: "pointer" }}>
                                                                        <span className="order-list-text">{order.firstname}</span>
                                                                        <span className="order-list-text">{order.orderId}</span>
                                                                        <span className="order-list-text">₦ {order.total}</span>
                                                                        <span className="order-list-text">{order.orderTime}</span>
                                                                    </div>

                                                                ))
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div className="ring-all">Loading
                                                            <span className='loading-ring-all'></span>
                                                        </div>
                                                    )
                                                }


                                                <div className='chev-icons'>
                                                    <span
                                                        className={`chev-left ${pageNumber <= 1 ? 'disabled' : ''}`}
                                                        onClick={pageNumber <= 1 ? null : handlePrevious}
                                                    >
                                                        <BsChevronLeft />
                                                    </span>
                                                    <span className='page-text'>Page {pagenumber} of {totalPages}</span>
                                                    <span
                                                        className={`chev-right ${pageNumber >= totalPages ? 'disabled' : ''}`}
                                                        onClick={pageNumber >= totalPages ? null : handleNext}
                                                    >
                                                        <BsChevronRight />
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>


            {/* each packs */}

            {
                modal && (<div>
                    <div className='center-add'>
                        <div className="is-add"></div>
                        <div className="center-content-add">
                            <div className="payment-container-add">
                                <div className="cancel-icon-add"><MdOutlineCancel className='cancel-add' onClick={handleCancel} /></div>
                                <div className='input-food-div'>
                                    <div className="order-view">
                                        <h2 className="o-v">Order View</h2>
                                    </div>

                                    {
                                        packOrders.map((order, index) => (
                                            <div key={index} className="">
                                                <div className="name-order-time-id">
                                                    <span className="order-name">{order.firstname}</span>
                                                    <span className="order-updated">{order.updatedAt}</span>
                                                    <span className="order-id">{order.orderId}</span>
                                                    <span className="order-list-text">{order.orderTime}</span>
                                                </div>

                                                <div className='bottom-line-order' style={{ bottom: '0' }}></div>
                                                {order.packs && order.packs.length > 0 ? (
                                                    <div>
                                                        {order.packs[0].items.map((item, itemIndex) => (
                                                            <div key={itemIndex}>
                                                                <div className="name-order-price">
                                                                    <span className="name-order-name">{item.name}</span>
                                                                    <span className="time-order-price">₦ {item.price}.00</span>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p>No items in this order.</p>
                                                )}

                                                <div className="order-total">
                                                    <span className="total-order-text">Total:</span>
                                                    <h2 className="total-order-total">₦ {order.total}.00</h2>
                                                </div>


                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }

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

export default VendorOrder
