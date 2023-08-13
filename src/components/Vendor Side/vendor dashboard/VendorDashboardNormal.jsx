import React, { useEffect, useState } from 'react'
import './VendorDashboard.css'
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import { CiBookmarkMinus } from 'react-icons/ci'
import { MdOutlineCancel } from 'react-icons/md'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'

const VendorDashboardNormal = () => {

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const [clickedHome, setClickedHome] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedOrder, setClickedOrder] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [balances, setBalances] = useState([])
    const [normal, setNormal] = useState([])
    const [night, setNight] = useState([])
    const [packOrders, setPackOrders] = useState([])
    const [modal, setModal] = useState(false)
    const [serveButton, setServeButton] = useState({})
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
        history.push("/vendor-dashboard")
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


    // Normal Orders
    useEffect(() => {
        axios.get("https://api-chow.onrender.com/api/orders/today/normal", { headers })
            .then(response => {
                console.log(response.data.data)
                setLoading(true)
                setNormal(response.data.data)
            }).catch(e => {
                console.log(e)
            })
    }, [])


    const handlePacks = (_id) => {
        console.log(_id)
        axios.get(`https://api-chow.onrender.com/api/orders/id/${_id}`, { headers })
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

    // serve button
    const handleServe = async (_id) => {
        try {
            console.log("Handling serve for _id:", _id);

            const accessToken = localStorage.getItem("Access-Token-vendor");
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };

              // Determine the new button text based on the current text
              const newButtonText = serveButton[_id] === 'Unserve' ? 'Serve' : 'Unserve';
    
              // Call the appropriate API based on button text
              const apiUrl = newButtonText === 'Serve'
                  ? `https://api-chow.onrender.com/api/orders/unserve/${_id}`
                  : `https://api-chow.onrender.com/api/orders/serve/${_id}`;
      
              // Call the API to serve/un-serve the order
              const response = await axios.patch(apiUrl, {}, { headers });
              console.log("API Response:", response);
      
              // Update the button text and status of the order locally
              setServeButton(prevButtonTexts => ({ ...prevButtonTexts, [_id]: newButtonText }));
              setNormal(prevNormal =>
                  prevNormal.map(order =>
                      order._id === _id ? { ...order, status: newButtonText === 'Serve' ? 'Pending' : 'Served' } : order
                  )
              );
      
          } catch (error) {
              console.error("Error occurred while handling serve:", error);
          }
      };
  
    // Retrieve the initial state from session storage when the component mounts
    useEffect(() => {
        const initialServeButtonState = JSON.parse(sessionStorage.getItem('serveButtonState')) || {};
        setServeButton(initialServeButtonState);
    }, []);

    // Save the updated state in session storage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('serveButtonState', JSON.stringify(serveButton));
    }, [serveButton]);

    return (
        <div>
            <div className='container-vendor-dashboard'>
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
                        <Grid item lg={9} md={9} sm={9} paddingLeft={1.6}>
                            <div className="vendor-dashboard">
                                <div className="dashboard-text">
                                    <span className="dash-text">Dashboard</span> <br />
                                    <span className="profile-date">{date} - {time}</span>
                                </div>
                                <div className='bottom-line-dashboard' style={{ bottom: '0' }}></div>
                                <div className="cart-container">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="total-revenue">
                                                <div className="money-icon"><TbCurrencyNaira className='naira-icon' /> +32.60%</div>
                                                <h2 className='revenue-amount'>₦ {vendorBalance}.00</h2>
                                                <p className="revenue-text">Total Revenue</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="total-dish">
                                                <div className="dish-icon"><CiBookmarkMinus className='bookmark-icon' /> -12.12%</div>
                                                <h2 className='dish-amount'>{totalOrdered}</h2>
                                                <p className="dish-text">Total Dish Ordered</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Orders */}
                                <div className="orders-cart-container">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="normal-order" style={{ marginBottom: '2rem' }}>
                                                <h2 className="normal-text">Today's Normal Orders</h2>
                                                <div className="order-menu-text">
                                                    <span className="order-text-menu">Customer</span>
                                                    <span className="order-text-menu">Order</span>
                                                    <span className="order-text-menu">Total Payment</span>
                                                    <span className="order-text-menu">Time</span>
                                                    <span className="order-text-menu">Status</span>
                                                </div>
                                                <div className='bottom-line-normal' style={{ bottom: '0' }}></div>
                                                {
                                                    loading ? (
                                                        <div className='order-list-container'>
                                                            {
                                                                normal.length > 0 ? (
                                                                    normal.map(norm => (
                                                                        <div key={norm._id} className="order-menu-list"
                                                                            onClick={() => { handlePacks(norm._id) }}
                                                                            style={{ cursor: "pointer" }}>
                                                                            <span className="order-list-text">{`${norm.firstname} ${norm.lastname}`}</span>
                                                                            <span className="order-list-text">{norm.orderId}</span>
                                                                            <span className="order-list-text">₦ {norm.total}</span>
                                                                            <span className="order-list-text">{norm.orderTime}</span>
                                                                            <span className="order-list-text">{norm.status}</span>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="no-orders-text">No orders yet.</div>
                                                                )
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div className="ring-normal">Loading
                                                            <span className='loading-ring-normal'></span>
                                                        </div>
                                                    )
                                                }
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
                                                    <span className="order-updated">{order.readable_updated_time}</span>
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
                                                    <span className="total-order-text">Packs: </span>
                                                    <h2 className="total-order-total">{order.total_num_of_packs}</h2>
                                                </div>

                                                <div className="order-total">
                                                    <span className="total-order-text">Total:</span>
                                                    <h2 className="total-order-total">₦ {order.total}.00</h2>
                                                </div>
                                                <div className="btn-pop">
                                                    <button
                                                        type='Submit'
                                                        className={`btn-pop-up ${serveButton[order._id] === 'Unserve' ? 'unserve-btn' : ''}`}
                                                        onClick={() => handleServe(order._id)}>
                                                        {serveButton[order._id] === 'Unserve' ? 'Unserve' : 'Serve'}
                                                    </button>

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

export default VendorDashboardNormal
