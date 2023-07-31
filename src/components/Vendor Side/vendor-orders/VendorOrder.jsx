import React, { useState, useEffect } from 'react'
import './VendorOrder.css'
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { MdOutlineCancel } from "react-icons/md"
import axios from 'axios'

const VendorOrder = () => {

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const [clickedHome, setClickedHome] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [orders, setOrders] = useState([])
    const [modal, setModal] = useState(false)
    const [packOrders, setPackOrders] = useState([])
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

    useEffect(() => {
        setClickedOrder(true)
    }, [])


    // Get All Orders
    useEffect(() => {
        axios.get("https://api-chow.onrender.com/api/orders", { headers })
            .then(response => {
                console.log(response.data.data)
                setOrders(response.data.data)
            }).catch(e => {
                console.log(e)
            })
    }, [])

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
                        <Grid item lg={3} md={3}>
                            <div className="nav-menu">
                                <div className={coloredHome} onClick={handleClickedHome}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><AiFillHome /></span>
                                        <span className="menu-text">Home</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text">Analysis, order report, etc...</span>
                                    </div>
                                </div>
                                <div className={coloredOrder} onClick={handleClickedOrder}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><MdRestaurantMenu /></span>
                                        <span className="menu-text">Order</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-order">Your previous orders</span>
                                    </div>
                                </div>
                                <div className={coloredMenu} onClick={handleClickedMenu}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><BsDashCircleDotted /></span>
                                        <span className="menu-text">Menu</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-menu">Manage your product, pricing, etc</span>
                                    </div>
                                </div>
                                <div className={coloredSettings} onClick={handleClickedSettings}>
                                    <div className="menu-item">
                                        <span className="menu-icon"><RiListSettingsLine /></span>
                                        <span className="menu-text">Profile Setting</span> <br />
                                    </div>
                                    <div className="below-text">
                                        <span className="menu-below-text-setting">Manage your account</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={9} md={9}>
                            <div className="vendor-dashboard">
                                <div className="dashboard-text">
                                    <span className="dash-text">Orders</span> <br />
                                    <span className="profile-date">{date} - {time}</span>
                                </div>
                                {/* Orders */}
                                <div className="orders-cart-container">
                                    <div className="row">
                                        {/* Normal order */}
                                        <div className="col-lg-12 col-md-12">
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


                                                {/* {
                                                    orders.map((order, index) => (
                                                        <div key={index} className="order-history">

                                                            {order.packs && order.packs.length > 0 ? (
                                                                <div>
                                                                    {order.packs[0].items.map((item, itemIndex) => (
                                                                        <div key={itemIndex} className='div-flex'>
                                                                            <span className='detail-text'>{order.firstname}</span>
                                                                            <span className='detail-text-menu'>Orders #{item.name}</span>
                                                                            <span className='detail-text-price'>₦ {item.price}</span>
                                                                            <span className='detail-text-status'>{order.orderTime}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p>No items in this order.</p>
                                                            )}


                                                        </div>
                                                    ))
                                                } */}
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

        </div>
    )
}

export default VendorOrder
