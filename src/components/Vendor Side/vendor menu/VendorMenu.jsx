import React, { useState, useEffect } from 'react'
import "./VendorMenu.css"
import "./AddNewFood.css"
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { FaPencilAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'
import AddNewFood from './AddNewFood'
import { MdOutlineCancel } from 'react-icons/md'
import Swal from 'sweetalert2'
import { BiMoneyWithdraw } from 'react-icons/bi'

const VendorMenu = () => {

    const [clickedHome, setClickedHome] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(false);
    const [activeNav, setActiveNav] = useState('')
    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedSettings, setClickedSettings] = useState(false);
    const [clickedWithdrawal, setClickedWithdrawal] = useState(false);
    const [available, setAvailable] = useState(false)
    const [text, setText] = useState(false)
    const [meals, setMeals] = useState([])
    const [mealsMenu, setMealsMenu] = useState([])
    const [clickedButtons, setClickedButtons] = useState([]);
    const [loading, setLoading] = useState(false)
    const [availabilityStatus, setAvailabilityStatus] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false)
    const [modal, setModal] = useState(false)
    const [modala, setModala] = useState(false)
    const [price, setPrice] = useState('')
    const [menuIdToUpdate, setMenuIdToUpdate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [customFood, setCustomFood] = useState([])
    const history = useHistory();

    // Auth
    const accessToken = localStorage.getItem("Access-Token-vendor");

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };


    const refreshToken = localStorage.getItem("Refresh-Token");

    const headersRef = {
        Cookies: `refreshToken=${refreshToken}`,
    };

    const refreshPage = () => {
        setRefresh(!refresh);
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
        availableText.push(<FaPencilAlt />)
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
        setClickedMenu(true)
    }, [])


    const handleAvailable = (foodId) => {
        // Check the current status of the food
        const currentStatus = availabilityStatus[foodId];

        if (currentStatus === "Available") {
            // Food is available, perform the API call to delete the food
            const mealToUpdate = mealsMenu.find(menuMeal => menuMeal.food_id === foodId);
            if (mealToUpdate) {
                const menu_id = mealToUpdate._id;
                console.log(menu_id)

                axios.delete(`https://api-chow.onrender.com/api/vendors/menu/meals/${menu_id}`, { headers })
                    .then(response => {
                        console.log(response);

                        // Food is deleted, set the availability status to "Not available"
                        setAvailabilityStatus(prevStatus => ({
                            ...prevStatus,
                            [foodId]: "Not available"
                        }));

                        setRefresh(prevState => !prevState)
                    })
                    .catch(e => {
                        console.log(e);
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            text: 'Failed to remove food from meals menu'
                        });
                    });
            }
        } else {
            // Food is not available, perform the API call to add the food
            const food_meal_id = meals.find(meal => meal.food_id === foodId);
            if (food_meal_id) {
                const food_item_id = food_meal_id.food_id;
                const price = food_meal_id.price;
                console.log(price)
                console.log(food_item_id);

                axios.post("https://api-chow.onrender.com/api/vendors/menu/meals", {
                    food_item_id: food_item_id,
                    price: price
                }, { headers })
                    .then(response => {
                        console.log(response);

                        // Food is added, set the availability status to "Available"
                        setAvailabilityStatus(prevStatus => ({
                            ...prevStatus,
                            [foodId]: "Available"
                        }));

                        setRefresh(prevState => !prevState)
                    })
                    .catch(e => {
                        console.log(e);
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            text: 'Failed to add food to meals menu'
                        });
                    });
            }
        }
    };


    const handleEdit = (foodId) => {
        // Find the corresponding meal from mealsMenu using the food_id
        const mealToUpdate = mealsMenu.find(menuMeal => menuMeal.food_id === foodId);
        if (mealToUpdate) {
            const menuId = mealToUpdate._id;
            localStorage.setItem("meal_id", menuId);
            setMenuIdToUpdate(menuId); // Set the _id to be used when updating the price
            // setPrice(mealToUpdate.price); // Set the current price in the input field
            setModala(true); // Open the modal
        }
    };

    const handleCancel = () => {
        setModala(false)
    }

    // get the food _id from local storage
    const menu_id = localStorage.getItem("meal_id")

    // Call the update API
    const handleUpdatePrice = (e) => {
        e.preventDefault()
        axios.patch("https://api-chow.onrender.com/api/vendor/menu/update/meals", {
            menu_id: menu_id,
            price: price
        }, { headers })
            .then(response => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: 'Price updated successfully, click ok to continue'
                });
                setRefresh(prevState => !prevState)
                setModala(false)
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'An error occured...'
                });
            })
    }



    const handleVendorDrink = () => {
        history.push("/vendor-drink")
    }

    const handleVendorSide = () => {
        history.push("/vendor-side")
    }

    const handleVendorSpecial = () => {
        history.push("/vendor-special")
    }

    // Meal API

    const vendorId = localStorage.getItem("Vendor-Id")

    useEffect(() => {
        // Food API
        async function fetchData() {
            try {
                const foodResponse = await axios.get("https://api-chow.onrender.com/api/food/meals");
                console.log(foodResponse);
                setLoading(true)
                setMeals(foodResponse.data.data);
                setDataLoaded(true);

                const menuResponse = await axios.get(`https://api-chow.onrender.com/api/vendors/menu/meals/${vendorId}`);
                setMealsMenu(menuResponse.data.data);
                console.log(menuResponse);
                const menuMeals = menuResponse.data.data;

                // Extract food_ids from both API responses
                const foodApiFoodIds = foodResponse.data.data.map(meal => meal.food_id);
                const menuApiFoodIds = menuMeals.map(menuMeal => menuMeal.food_id);

                // Create an object with food_id as key and availability status as value
                const statusObject = {};
                foodApiFoodIds.forEach(food_id => {
                    statusObject[food_id] = menuApiFoodIds.includes(food_id) ? "Available" : "Not available";
                });

                setAvailabilityStatus(statusObject);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [refresh])

    const handleAddDish = () => {
        setModal(!modal)
    }

    const styling = {
        container: {
            paddingLeft: 0
        }
    }

    // Custom foods
    useEffect(() => {
        axios.get(`https://api-chow.onrender.com/api/vendors/menu/custom/meals/${vendorId}`, { headers })
            .then(response => {
                console.log(response)
                setCustomFood(response.data.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    // delete special food
    const handleDelete = (_id) => {
        console.log(_id)
        axios.delete(`https://api-chow.onrender.com/api/vendors/menu/meals/${_id}`, { headers })
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
                        <Grid item lg={3} md={3} sm={3} >
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
                        <Grid item lg={9} md={9} sm={9} xs={12} sx={styling.container}>
                            <div className="vendor-menu-body">
                                <div className="ven-menu-text">
                                    <h2 className="ven-text">Menu</h2>
                                    <div className="ven-menu-categories">
                                        <span className="ven-category">Main Foods</span>
                                        <span className="ven-category" onClick={handleVendorSide}>Sides</span>
                                        <span className="ven-category" onClick={handleVendorDrink}>Drinks</span>
                                        <span className="ven-category" onClick={handleVendorSpecial}>Specials</span>
                                    </div>
                                </div>
                                <div className='bottom-line-menu' style={{ bottom: '0' }}></div>
                                <div className="ven-menu-foods">

                                    {/* TODO: change icon to top */}
                                    {
                                        loading ? (
                                            <div className="row row-last order-list-container">
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                                                    <div className="add-new-dish" onClick={handleAddDish}>
                                                        <span className="add-dish-icon">+</span>
                                                        <p className="add-dish-text">Add new dish</p>
                                                    </div>
                                                </div>

                                                {

                                                    meals.map((meal, index) => (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={index}>
                                                            <div className="ven-menu-food">
                                                                {availabilityStatus[meal.food_id] === "Available" ? (
                                                                    <FaPencilAlt className='edit-icon' onClick={(e) => { e.stopPropagation(); handleEdit(meal.food_id); }} />
                                                                ) : ""}
                                                                <img src={`https://api-chow.onrender.com/static/${meal.food_id}.jpg`} alt="Food img"
                                                                    className={availabilityStatus[meal.food_id] === "Available" ? 'ven-food-img' : 'ven-food-img-not'} />
                                                                <p className="ven-food-name">{meal.food_name}</p>
                                                                <p className="ven-food-price">₦ {mealsMenu.find(menuMeal => menuMeal.food_id === meal.food_id)?.price}.00</p>
                                                                <div
                                                                    className={availabilityStatus[meal.food_id] === "Available" ? 'ven-food-status-colored avai-status-colored' : 'ven-food-status avai-status'}
                                                                    onClick={() => handleAvailable(meal.food_id)}
                                                                >
                                                                    <span
                                                                        className={availabilityStatus[meal.food_id] === "Available" ? 'ven-food-status-colored avai-status-colored' : 'ven-food-status avai-status'}
                                                                    >
                                                                        {availabilityStatus[meal.food_id]}
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (<div className="ring-all">Loading
                                            <span className='loading-ring-all'></span>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={12} sx={styling.container}>

                        </Grid>
                        {/* Custom food */}
                        <Grid item lg={9} md={9} sm={9} xs={12} sx={styling.container}>
                            <div className="vendor-menu-body">
                                <div className="ven-menu-text">
                                    <h2 className="ven-text" style={{ fontWeight: '700' }}>Custom</h2>
                                </div>
                                <div className='bottom-line-menu' style={{ bottom: '0' }}></div>
                                <div className="ven-menu-foods">

                                    {/* TODO: change icon to top */}
                                    {
                                        loading ? (
                                            <div className="row row-last order-list-container">

                                                {customFood.length > 0 ? (
                                                    customFood.map((food, index) => (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={index}>
                                                            <div className="ven-menu-food">
                                                                <img src={`https://api-chow.onrender.com${food.image_url}`} alt="Food img" className='ven-food-img' />
                                                                <p className="ven-food-name">{food.food_name}</p>
                                                                <p className="ven-food-price">₦ {food.price}.00</p>
                                                                <p className='remove-food' onClick={() => handleDelete(food._id)}><MdDelete className='delete-icon-special-remove' /> Remove</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p style={{textAlign: 'center', fontWeight: '700', color: '#D21A32'}}>No Custom food</p>
                                                )}
                                            </div>
                                        ) : (<div className="ring-all">Loading
                                            <span className='loading-ring-all'></span>
                                        </div>)
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
                            <AddNewFood handleAddDish={handleAddDish} />
                        </div>

                    </div>
                )
            }

            {/* Edit price */}
            {
                modala && (
                    <div className='center-add'>
                        <div className="is-add"></div>
                        <div className="center-content-add">
                            {/* <EditPrice handleEdit={handleEdit} /> */}

                            <div className="payment-container-add">
                                <div className="cancel-icon-add"><MdOutlineCancel className='cancel-add' onClick={handleCancel} /></div>
                                <div className='input-food-div'>
                                    <form onSubmit={handleUpdatePrice}>
                                        <div className="form">
                                            <div className="mb-3">
                                                <label htmlFor="price" className="form-label label-text-add">New Price</label>
                                                <input type='text'
                                                    className="form-control input-add"
                                                    id="price" placeholder="₦ 00.00"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button type='Submit' className='add-btn'>Save</button>
                                        </div>
                                    </form>
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

export default VendorMenu
