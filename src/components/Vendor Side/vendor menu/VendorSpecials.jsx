import React, { useState, useEffect } from 'react'
import "./VendorMenu.css"
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'
import { MdOutlineCancel } from 'react-icons/md'
import Swal from 'sweetalert2'
import AddNewSpecial from './AddNewSpecial'

const VendorMenuSpecials = () => {

    const [clickedHome, setClickedHome] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [available, setAvailable] = useState(false)
    const [text, setText] = useState(false)
    const [specials, setSpecials] = useState([])
    const [mealsMenu, setMealsMenu] = useState([])
    const [clickedButtons, setClickedButtons] = useState([]);
    const [availabilityStatus, setAvailabilityStatus] = useState({});
    const [loading, setLoading] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [modala, setModala] = useState(false);
    const [menuIdToUpdate, setMenuIdToUpdate] = useState(null);
    const [price, setPrice] = useState('')
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
    let colored = [];
    let availableText = [];
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

    if (available) {
        colored.push('ven-food-status-colored avai-status-colored')
    } else {
        colored.push('ven-food-status avai-status')
    }

    if (text) {
        availableText.push('Available   ')
        availableText.push(<FaEdit />)
    } else {
        availableText.push('Not available')
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
        history.push("/vendor-order")
    }
    const handleClickedMenu = () => {
        setClickedHome(false)
        setClickedOrder(false)
        setClickedMenu(true)
        setClickedSettings(false)
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
        setClickedMenu(true)
    }, [])

    const handleVendorDrink = () => {
        history.push("/vendor-drink")
    }

    const handleVendorSide = () => {
        history.push("/vendor-side")
    }

    const handleVendorMenu = () => {
        history.push("/vendor-menu")
    }

    // Specials
    

    const vendorId = localStorage.getItem("Vendor-Id")

    useEffect(() => {
        // Food API
        async function fetchData() {
            try {
                const foodResponse = await axios.get(`https://api-chow.onrender.com/api/vendors/menu/specials/${vendorId}`, {headers});
                console.log(foodResponse);
                setLoading(true)
                setSpecials(foodResponse.data.data);
                setDataLoaded(true);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [])

    // delete special food
    const handleDelete = (_id) => {
        console.log(_id)
        axios.delete(`https://api-chow.onrender.com/api/vendors/menu/specials/${_id}`, {headers})
        .then(res => {
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'DELETED',
                text: 'Food deleted successfully, Click OK to continue'
            });
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }).catch(e => {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'An Error Occured'
            });
        })
    }

    // Modal
    const handleAddDish = () => {
        setModal(!modal)
    }

    return (
        <div>
            <div className="container-vendor-menu">
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
                            <div className="vendor-menu-body">
                                <div className="ven-menu-text">
                                    <h2 className="ven-text">Menu</h2>
                                    <div className="ven-menu-categories">
                                        <span className="ven-category" onClick={handleVendorMenu}>Main Foods</span>
                                        <span className="ven-category" onClick={handleVendorSide}>Sides</span>
                                        <span className="ven-category" onClick={handleVendorDrink}>Drinks</span>
                                        <span className="ven-category">Specials</span>
                                    </div>
                                </div>
                                <div className='bottom-line-menu' style={{ bottom: '0' }}></div>
                                <div className="ven-menu-foods">
                                    {
                                        loading ? (
                                            <div className="row row-last order-list-container">
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                                                    <div className="add-new-dish" onClick={handleAddDish}>
                                                        <span className="add-dish-icon">+</span>
                                                        <p className="add-dish-text">Add new special</p>
                                                    </div>
                                                </div>
                                                {
                                                    specials.map((special, index) => (
                                                        <div key={special._id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                                                            <div className="ven-menu-food">
                                                                <img src={`https://api-chow.onrender.com${special.image_url}`} alt="Food img" className='ven-food-img' />
                                                                <p className="ven-food-name">{special.food_item}</p>
                                                                <p className="ven-food-price">₦ {special.price}.00</p>
                                                                <p className='remove-food' onClick={() => handleDelete(special._id)}><MdDelete className='delete-icon-special-remove' /> Remove</p>
                                                            </div>
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
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            {/* Add new Dish */}
            {
                modal && (
                    <div className='center-add'>
                        <div className="is-add"></div>
                        <div className="center-content-add">
                            <AddNewSpecial handleAddDish={handleAddDish} />
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

        </div >
    )
}

export default VendorMenuSpecials
