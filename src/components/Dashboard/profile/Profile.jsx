import React, { useState } from 'react'
import './Profile.css'
import Img from '../../../assets/logo.png'
import ProfileImg from '../../../assets/profile-img.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { Grid } from '@mui/material'
import { RiListSettingsLine } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'
import { BsCartDashFill } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Profile = ({name}) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const changePassword = {oldPassword, newPassword}
    const userName = {username}
    const Email = {email}

    const [modal, setModal] = useState(false)
    const [activeNav, setActiveNav] = useState('')
    const history = useHistory()

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const accessToken = localStorage.getItem("Access-Token");
    const refreshToken = localStorage.getItem("Refresh-Token");

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookies: `refreshToken=${refreshToken}`,
    };

    const handleModal = () => {
        setModal(!modal)
    }


    const handleChanges = (e) => {
        e.preventDefault()
        axios.post('https://chow.onrender.com/api/v1/changeUserName', userName, {headers})
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

        axios.post('https://chow.onrender.com/api/v1/changeUserEmail', Email, {headers})
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

        axios.post('https://chow.onrender.com/api/v1/changeUserPassword', changePassword, {headers})
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
    
    const handleHome = () => {
        history.push('/dashboard')
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/')
      }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-nav-bar">
                    <div className="profile-logo-img" >
                        <img src={Img} alt="logo img" onClick={handleHome} style={{cursor: 'pointer'}} />
                    </div>
                    <div className="nav-icons">
                        <span className="nav-icon"><CiUser /></span>
                        <span className="nav-icon"><CiSearch /></span>
                        <span className="nav-icon" ><CiShoppingCart /></span>
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>

                {/* Main Body */}
                <div className="profile-main-body">
                    <div className="profile-grid">
                        <Grid container spacing={2}>
                            <Grid lg={4} md={4} sm={4} xs={12}>
                                <div className="left-side-profile">
                                    <div className="profile-img-text">
                                        <img src={ProfileImg} alt="profile" />
                                        <div className="text">
                                            <span className="profile-name">{name}</span>
                                            <br />
                                            <span className="profile-date">{date} - {time}</span>
                                        </div>
                                    </div>
                                    <br />
                                    <hr />
                                    <div className="profile-buttons">
                                        <div className="profile-setting-btn">
                                            <button className="setting-btn" onClick={handleModal}><RiListSettingsLine className='setting-icon' /> Profile Setting</button>
                                        </div>
                                        <br />
                                        <div className="profile-logout-btn">
                                            <button className="logout-btn" onClick={handleLogout}><BiLogOut className='logout-icon' /> Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid lg={8} md={8} sm={8} xs={12}>
                                <div className="right-side-profile">
                                    {
                                        modal && (
                                            <div className="profile-from">
                                                <form onSubmit={handleChanges}>
                                                    <Grid container spacing={2}>
                                                        <Grid lg={6} md={6} sm={6} xs={12}>
                                                            <div className="mb-3 input-div">
                                                                <label htmlFor="username" className="form-label label-text-profile">Username</label>
                                                                <input type="text"
                                                                    className="form-control profile-input"
                                                                    id="username"
                                                                    placeholder="Okomayin Onaivi"
                                                                    name='username'
                                                                    value={username}
                                                                    onChange={e => setUsername(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-3 input-div">
                                                                <label htmlFor="email" className="form-label label-text-profile">Email</label>
                                                                <input type="email"
                                                                    className="form-control profile-input"
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
                                                                <input type="password"
                                                                    className="form-control profile-input"
                                                                    id="old-password"
                                                                    placeholder="**********"
                                                                    name='oldPassword'
                                                                    value={oldPassword}
                                                                    onChange={e => setOldPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-3 input-div-pass">
                                                                <label htmlFor="new-password" className="form-label label-text-profile">New Password</label>
                                                                <input type="password"
                                                                    className="form-control profile-input"
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
                                        )
                                    }
                                    <br />
                                    <div className='user-orders'>
                                        <div className="profile-order">
                                            <span className='profile-order-text'>Orders History</span>
                                            <button className="filter-btn"><RiListSettingsLine className='filter-icon' /> Filter Order</button>
                                        </div>
                                        <div className="order-categories">
                                            <span className="order-category">Customer</span>
                                            <span className="order-category">Menu</span>
                                            <span className="order-category">Total Payment</span>
                                            <span className="order-category">Status</span>
                                        </div>
                                        <div className="order-line" style={{ borderBottom: '1.5px solid black' }}></div>
                                        <div className="order-history">
                                            <div className="history-detail">
                                                <span className='detail-text'>Orders #34562</span>
                                                <span className='detail-text-menu' style={{ marginRight: '2rem' }}>White rice and stew</span>
                                                <span className='detail-text-price' style={{ marginRight: '4rem' }}>₦1,200</span>
                                                <span className='detail-text-status'>Pending</span>
                                            </div>
                                        </div>
                                        <div className="order-history">
                                            <div className="history-detail">
                                                <span className='detail-text'>Orders #34562</span>
                                                <span className='detail-text-menu' style={{ marginRight: '2rem' }}>White rice and stew</span>
                                                <span className='detail-text-price' style={{ marginRight: '4rem' }}>₦1,200</span>
                                                <span className='detail-text-green'>Completed</span>
                                            </div>
                                        </div>
                                        <div className="order-history">
                                            <div className="history-detail">
                                                <span className='detail-text'>Orders #34562</span>
                                                <span className='detail-text-menu' style={{ marginRight: '2rem' }}>White rice and stew</span>
                                                <span className='detail-text-price' style={{ marginRight: '4rem' }}>₦1,200</span>
                                                <span className='detail-text-green'>Completed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
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

export default Profile
