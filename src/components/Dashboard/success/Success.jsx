import React, { useEffect, useState } from 'react'
import './Success.css'
import Img from '../../../assets/logo.png'
import Confirm from '../../../assets/confirm-order.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { BsCartDashFill } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Success = () => {

    const history = useHistory()
    const [activeNav, setActiveNav] = useState('')

    const handleHome = () => {
        history.push('/dashboard')
    }

    const accessToken = localStorage.getItem("Access-Token");
    const refreshToken = localStorage.getItem("Refresh-Token");

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookies: `refreshToken=${refreshToken}`,
    };

    // Getting parameters from localstorage

    const items = JSON.parse(localStorage.getItem("cartItems"))
    const vendorId = localStorage.getItem("vendor-id")
    const orderTime = localStorage.getItem("Time")
    const packs = [
        {
            packType: localStorage.getItem("Pack"),
            amount: localStorage.getItem("Pack-Amount"),
            items: items
        }
    ]

    console.log(typeof items)
    const orderVariables = { vendorId, orderTime, packs }
    console.log(orderVariables)

    // Callback API

    useEffect(() => {
        axios.get("https://chow.onrender.com/api/v1/paystack/pay/callback", { headers })
            .then(response => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: 'Your payment has been confirmed and your order has been taken successfully.'
                });

                axios.post("https://chow.onrender.com/api/v1/orders", orderVariables, { headers })
                    .then(response => {
                        console.log(response)
                    }).catch(e => {
                        console.log(e)
                    })
                
            }).catch(e => {
                console.log(e)
            })
    })

    const handleCallback = (e) => {
        e.preventDefault()

        history.push("/dashboard")


    }

    const handleCallbackProfile = (e) => {
        e.preventDefault()

        history.push("/profile")


    }
    const handleCallbackorder = (e) => {
        e.preventDefault()

        history.push("/order")


    }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-nav-bar">
                    <div className="profile-logo-img" >
                        <img src={Img} alt="logo img" style={{ cursor: 'pointer' }} onClick={handleCallback} />
                    </div>
                    <div className="nav-icons">
                        <span className="nav-icon" onClick={handleCallbackProfile}><CiUser /></span>
                        <span className="nav-icon" onClick={handleCallbackorder} ><CiShoppingCart /></span>
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>

                {/* Main Body */}
                <div className="success-main-body">
                    <div className="confirm-image">
                        <img src={Confirm} alt="success-img" className="success-img" onClick={handleCallback} />
                    </div>
                </div>
            </div>


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
                <a href='#b' onClick={() => {
                    setActiveNav('#b')
                }} className={activeNav === '#b' ? 'active' : ''}><BsCartDashFill />
                    <span onClick={() => {
                        setActiveNav('#b')
                    }} className={activeNav === '#b' ? 'active' : 'none'}>Cart</span></a>

                {/* Profile */}
                <a href='#c' onClick={() => setActiveNav('#c')} className={activeNav === '#c' ? 'active' : ''}><BiUserCircle />
                    <span onClick={() => setActiveNav('#c')} className={activeNav === '#c' ? 'active' : 'none'}>Profile</span></a>
            </nav>
        </div>
    )
}

export default Success
