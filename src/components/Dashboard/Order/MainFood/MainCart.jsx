import React, { useState, useEffect } from 'react'
import './MainFood.css'
import Img from '../../../../assets/logo.png'
import FoodImg from '../../../../assets/food-img.jpg'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { BsCartDashFill } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineCancel } from 'react-icons/md'
import Payment from '../payment/Payment'


const MainCart = ({ cart, setCart, handleChange, size, setShow }) => {

    const [count, setCount] = useState(500);
    const [countOne, setCountOne] = useState(100);
    const [main, setMain] = useState(false)
    const history = useHistory()
    const [activeNav, setActiveNav] = useState('')
    const [price, setPrice] = useState(0)
    const [pricePack, setPricePack] = useState(0)
    const [packAmount, setPackAmount] = useState('')

    if (count > 2000) {
        setCount(2000)
    } else if (count < 100) {
        setCount(100)
    }

    if (countOne > 2000) {
        setCountOne(2000)
    } else if (countOne < 100) {
        setCountOne(100)
    }

    const handleSubtotalAmountInc = () => {
        setCount(count + 500);
    }

    const handleSubtotalAmountDec = () => {
        setCount(count - 100);
    }

    let mainColor = [];

    if (main) {
        mainColor.push('main-red')
    } else {
        mainColor.push('main')
    }

    const handleSmall = () => {
        const pack = document.getElementById("pack").value
        console.log(pack)
        localStorage.setItem("Pack", pack)
        let packType = localStorage.getItem("Pack")
        if (packType === 'none') {
            const pricepackValue = price + 0
            setPricePack(pricepackValue)
            console.log(pricepackValue)
        }
        else if (packType === 'smallPack') {
            const pricepackValue = price + 50
            setPricePack(pricepackValue)
            console.log(pricepackValue)
        }
        else if (packType === 'bigPack') {
            const pricepackValue = price + 70
            setPricePack(pricepackValue)
            console.log(pricepackValue)
        }
        else if (packType === 'plasticPack') {
            const pricepackValue = price + 100
            setPricePack(pricepackValue)
            console.log(pricepackValue)
        }

    }

    const handlePackAmount = () => {
        const packAmount = document.getElementById("pack-amount").value
        console.log(packAmount)
        localStorage.setItem("Pack-Amount", packAmount);
        let packAmountType = localStorage.getItem("Pack-Amount")

        if(packAmountType === "1"){
            const calculatePackAmount = pricePack + 0
            setPackAmount(calculatePackAmount)
            console.log(calculatePackAmount)
        }

        else if(packAmountType === "2"){
            const calculatePackAmount = pricePack * 2
            setPackAmount(calculatePackAmount)
            console.log(calculatePackAmount)
        }

        else if(packAmountType === "3"){
            const calculatePackAmount = pricePack * 3
            setPackAmount(calculatePackAmount)
            console.log(calculatePackAmount)
        }

        else if(packAmountType === "4"){
            const calculatePackAmount = pricePack * 4
            setPackAmount(calculatePackAmount)
            console.log(calculatePackAmount)
        }

        else if(packAmountType === "5"){
            const calculatePackAmount = pricePack * 5
            setPackAmount(calculatePackAmount)
            console.log(calculatePackAmount)
        }
    }

    const handlePrice = () => {
        let ans = 30;

        cart.map(item => {
            ans += item.amount * item.price
        })
        setPrice(ans)
    }

    const handleRemove = (_id) => {
        const arr = cart.filter(item => item._id !== _id)
        setCart(arr)
    }

    useEffect(() => {
        handlePrice()
        handleSmall()
        handlePackAmount()
    })

    const handleLogo = () => {
        history.push("/order")
    }

    const handleHome = () => {
        history.push('/dashboard')
    }


    const [modal, setModal] = useState(false)

    const handlePayment = () => {
        setModal(!modal)
        // console.log(price)
        localStorage.setItem("price", packAmount)

        const cartItems = []
        cart.map(item => {

            const pricePerQty = item.amount * item.price;
            // console.log(pricePerQty)

            const amountNumber = JSON.parse(localStorage.getItem("amountNumber")) || [];
            amountNumber.push(item.food_name);
            amountNumber.push(pricePerQty);

            const cartItem = {
                name: item.food_name,
                price: pricePerQty
            }

            cartItems.push(cartItem)
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        })
    }

    const handleProfile = () => {
        history.push('/profile')
    }

    const handleTime = () => {
        const time = document.getElementById("time").value
        console.log(time)
        localStorage.setItem("Time", time)
    }

    return (
        <div>
            <div className="container-food-cart">
                <div className="container-nav-cart">
                    <div className="logo-img" onClick={handleLogo} style={{ cursor: 'pointer' }}>
                        <img src={Img} alt="logo img" />
                    </div>
                    <div className="nav-icons">
                        <span className="nav-icon" onClick={handleProfile}><CiUser /></span>
                        <span className="nav-icon"><CiSearch /></span>
                        <span className="nav-icon" onClick={() => setShow(false)}><CiShoppingCart /></span>
                        <span className='cart-size'>{size}</span>
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>
                <div className='main-body'>
                    <Grid container spacing={2}>
                        {/* <div className="grid-main-div"> */}
                        <Grid item lg={7} md={12} sm={12} xs={12} bgcolor='white' sx={{
                            marginTop: '1rem',
                            borderRadius: '10px',
                            marginLeft: '1rem'
                        }}>
                            {
                                cart?.map(item => (
                                    <div className='main-div-food'>
                                        <div key={item._id} className="main-cart">
                                            <div className="main-food" >
                                                <img src={`https://api-chow.onrender.com/static/${item.food_id}.jpg`} alt="food-img" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                                                <span className='food-name'>
                                                    <span className="food-text">{item.food_name}{item.food_item}</span>
                                                    <div className="price-per-qty-div">
                                                        <span className="food-price-qty">₦ {item.price}.00</span>
                                                    </div>
                                                    <span className="food-price">
                                                        <span className='price-arrow' onClick={() => {
                                                            handleChange(item, -1)
                                                            handleSubtotalAmountDec()
                                                        }} ><AiOutlineMinus /></span>
                                                        <span className='price-count'>{item.amount}</span>
                                                        <span className='price-arrow' onClick={() => {
                                                            handleChange(item, +1)
                                                            handleSubtotalAmountInc()
                                                        }}><AiOutlinePlus /></span>
                                                    </span>
                                                </span>

                                            </div>
                                            <div className='delete-price'>
                                                <div className="price-div">
                                                    <span className='subtotal-span'>Subtotal: </span>
                                                    <span className='subtotal-price'>₦ {count}.00</span>
                                                </div>
                                                <div className="delete-div">
                                                    <span onClick={() => handleRemove(item._id)} className='delete-icon'><RiDeleteBin6Line /></span>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />
                                    </div>
                                ))
                            }

                        </Grid>
                        {/* </div> */}
                        <Grid item lg={4} md={12} sm={12} xs={12}>

                            <div className="cart-main-food">
                                <hr />
                                <div className="pack">
                                    <span className='pack-text'>Pack: </span>
                                    <select name="pack" id="pack" className='pack-select' onChange={handleSmall}>
                                        <option value="none">None</option>
                                        <option value=""></option>
                                        <option value="smallPack" id='smallPack'>smallPack</option>
                                        <option value="bigPack" id='bigPack'>bigPack</option>
                                        <option value="plasticPack" id='plasticPack'>plasticPack</option>
                                    </select>
                                </div>
                                <br />
                                {/* Amount of Packs */}
                                <div className="pack">
                                    <span className='pack-text'>Amount: </span>
                                    <select name="amount" id="pack-amount" className='amount-select' onChange={handlePackAmount}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            
                                <hr />
                                <div className="time">
                                    <span className='time-text'>Time: </span>
                                    <select name="time" id="time" className='time-select' onChange={handleTime}>
                                        <option value="">Choose...</option>
                                        <option value=""></option>
                                        <option value="15mins">15 minutes</option>
                                        <option value="30mins">30 minutes</option>
                                        <option value="1hr">1 hour</option>
                                        <option value="Night">Night</option>
                                    </select>
                                </div>
                                <hr />
                                 <div className="time">
                                    <span className='time-text'>VAT: </span>
                                    <span className="total-amount">₦ 30.00</span>
                                </div>
                                <div className="grand-total">
                                    <span className="total-text">Grand Total: </span>
                                    <span className="total-amount">₦ {packAmount}.00</span>
                                </div>
                                <div className="payment">
                                    <button className="payment-btn" onClick={handlePayment}>Proceed To Payments</button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>


                {/* Payment Methods */}
                {modal && (
                    <div className='center'>
                        <div className="is"></div>
                        <div className="center-content">
                            <Payment handlePayment={handlePayment} price={packAmount} />
                        </div>

                    </div>
                )}



                {/* Nav */}
                <nav>
                    {/* Home */}
                    <a href='#' onClick={() => {
                        setActiveNav('#')
                        handleHome()
                    }} className={activeNav === '#' ? 'active' : ''}><AiTwotoneHome />
                        <span onClick={() => setActiveNav('#')} className={activeNav === '#' ? '' : 'none'}>Home</span></a>

                    {/* Search */}
                    <a href='#a' onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : ''}><CiSearch />
                        <span onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : 'none'}>Search</span></a>

                    {/* Cart */}
                    <span className='cart-size-nav'>{size}</span>
                    <a href='#b' onClick={() => {
                        setActiveNav('#b')
                        setShow(false)
                    }} className={activeNav === '#b' ? 'active' : ''}><BsCartDashFill />
                        <span onClick={() => {
                            setActiveNav('#b')
                            setShow(false)
                        }} className={activeNav === '#b' ? 'active' : 'none'}>Cart</span></a>

                    {/* Profile */}
                    <a href='#c' onClick={() => setActiveNav('#c')} className={activeNav === '#c' ? 'active' : ''}><BiUserCircle />
                        <span onClick={() => {
                            setActiveNav('#c')
                            handleProfile()
                        }} className={activeNav === '#c' ? 'active' : 'none'}>Profile</span></a>
                </nav>

            </div>
        </div>
    )
}

export default MainCart
