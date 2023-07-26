import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Logo from '../../assets/logo.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { BsCartDashFill } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Grid } from '@mui/material'
import Select from '../../assets/select.png'
import chef from '../../assets/chef.png'
import Wallet from '../../assets/wallet.png'
import Dot from '../../assets/dot.png'
import DL from '../../assets/dot-light.png'
import Circle from '../../assets/circle.png'
import BL from '../../assets/bottom-line.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'


const Dashboard = () => {

    const [vendors, setVendors] = useState([])
    const [balances, setBalances] = useState([])
    const [activeNav, setActiveNav] = useState('#')
    const history = useHistory();
    const [loading, setLoading] = useState(false)



    const accessToken = localStorage.getItem("Access-Token");
    const refreshToken = localStorage.getItem("Refresh-Token");
    const userId = localStorage.getItem("User-Id")

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookies: `refreshToken=${refreshToken}`,
    };

    useEffect(() => {
        axios.get('https://chow.onrender.com/api/v1/getAllVendorsAccount', { headers })
            .then(response => {
                console.log(response.data.data)
                setVendors(response.data.data)
                setLoading(true)

                // const vendorsArray = response.data.data;
                // const itemIds = vendorsArray.map(item => item._id);
                // localStorage.setItem('itemIds', JSON.stringify(itemIds));

                // localStorage.setItem("id-5", response.data.data[4]._id)
            })

            .catch(e => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://chow.onrender.com/api/v1/getSingleAccountBalance/${userId}`, { headers })
            .then(response => {
                console.log(response.data.data)
                setBalances(response.data.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const handleVendor = (_id) => {
        // window.location.href = `${_id}`;
        console.log(_id)
        localStorage.setItem("vendor-id", _id)

        history.push('/order')
    }

    const handleProfile = () => {
        history.push('/profile')
    }

    const handleBudget = () => {
        history.push("/budget")
    }

    return (
        <div className='dashboard-container'>
            <div className="nav">
                <div className="logo-img">
                    <img src={Logo} alt="logo img" />
                </div>
                <div className="nav-icons">
                    <span className="nav-icon" onClick={handleProfile}><CiUser /></span>
                    <span className="nav-icon"><CiSearch /></span>
                    <span className="nav-icon"><CiShoppingCart /></span>
                </div>
            </div>

            <div className="body">
                    <marquee style={{fontSize: "1.5rem", background: "#FFFF8F", fontFamily: "Poppins", fontWeight: "900"}}>This Application is still under development!!!</marquee>
                <hr className='bottom-line-hr' />
                <Grid container spacing={2}>
                    <Grid item lg={7} md={6} sm={6} xs={12}>
                        <div className="chef-img">
                            <img src={Select} alt="vendor-img" className='select-img' />
                            <img src={Dot} alt="dot-img" className='dot-img' />
                            <img src={DL} alt="dot-img" className='dot-img-light' />
                            <img src={DL} alt="dot-img" className='dot-img-light-2' />
                            <img src={chef} alt="chef-img" className='chef-img-img' />
                        </div>
                    </Grid>
                    <Grid item lg={5} md={6} sm={6} xs={12} >
                        <div className="chef-img">
                            <img src={Wallet} alt="vendor-img" className='wallet-img' />
                            <div className="wallet-texts">
                                <p className='total-balance'>Total Balance</p>
                                {
                                    balances.map(balance => (
                                        <h2 className="wallet-amount">₦ {balance}</h2>
                                    ))
                                }

                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} xs={6}>
                                        <p className="add-fund" style={{ paddingLeft: '25px', cursor: 'pointer' }}
                                            onClick={handleBudget}>Budget</p>
                                    </Grid>
                                    <Grid item lg={6} md={6} xs={6}>
                                        <p className="add-fund-arrow">
                                            <img src={Circle} alt="" />
                                            <MdKeyboardArrowRight className='arrow' />
                                        </p>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div className='choose-vendor-text'>
                    <span className="choose-vendor">Choose Vendor</span>
                    <br />
                    <img src={BL} className='img-bottom-line' />
                </div>

                <div className="vendor">

                    {
                        loading ? (<Grid container spacing={2}>



                            {

                                vendors.map(vendor => {
                                    return (
                                        <Grid item lg={2} md={3} sm={4} xs={6} >
                                            <div key={vendor._id}>
                                                <div className="vendor-card">
                                                    <div className="card-v">
                                                        <span style={{ color: '#E9E9E9' }}>k</span>
                                                        {/* Put an Image here */}
                                                    </div>
                                                    <div className="button-name">
                                                        <button className='btn-name' onClick={() => handleVendor(vendor._id)}>{vendor.username}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })

                            }




                        </Grid>) : (
                            <div class="ring-dash">Loading
                                <span className='loading-ring-dash'></span>
                            </div>
                        )
                    }

                </div>
            </div>
            {/* Nav */}
            <nav>
                <a href='#' onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><AiTwotoneHome />
                    <span onClick={() => setActiveNav('#')} className={activeNav === '#' ? '' : 'none'}>Home</span></a>

                <a href='#a' onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : ''}><CiSearch />
                    <span onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : 'none'}>Search</span></a>

                <a href='#b' onClick={() => setActiveNav('#b')} className={activeNav === '#b' ? 'active' : ''}><BsCartDashFill />
                    <span onClick={() => setActiveNav('#b')} className={activeNav === '#b' ? 'active' : 'none'}>Cart</span></a>

                <a href='#c' onClick={() => setActiveNav('#c')} className={activeNav === '#c' ? 'active' : ''}><BiUserCircle />
                    <span onClick={() => {
                        setActiveNav('#c')
                        handleProfile()
                    }} className={activeNav === '#c' ? 'active' : 'none'}>Profile</span></a>
            </nav>
        </div>
    )
}

export default Dashboard