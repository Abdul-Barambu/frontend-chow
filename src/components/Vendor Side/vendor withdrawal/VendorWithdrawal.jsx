import React, { useState, useEffect } from 'react'
import "./VendorWithdrawal.css"
import Img from '../../../assets/logo.png'
import { Grid } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { BsDashCircleDotted } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'

const VendorWithdrawal = () => {

  const [clickedHome, setClickedHome] = useState(false);
  const [clickedOrder, setClickedOrder] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);
  const [clickedSettings, setClickedSettings] = useState(false);
  const [clickedWithdrawal, setClickedWithdrawal] = useState(false);

  const [account_number, setAccountNumber] = useState("")
  const [bankCode, setBankCode] = useState('');
  const [accountName, setAccountName] = useState("")
  const [amount, setAmount] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [withdrawalPin, setWithdrawalPin] = useState("")
  const [getBanks, setGetBanks] = useState([])
  const [activeNav, setActiveNav] = useState('')

  const history = useHistory();

  // Auth
  const accessToken = localStorage.getItem("Access-Token-vendor");
  const refreshToken = localStorage.getItem("Refresh-Token");
  const vendorUsername = localStorage.getItem("vendor-username");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Cookies: `refreshToken=${refreshToken}`,
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
    setClickedWithdrawal(true)
  }, [])


  // Transaction APIs

  // getBank
  useEffect(() => {
    axios.get("https://api-chow.onrender.com/api/bank", { headers })
      .then(response => {
        console.log(response)
        setGetBanks(response.data.data)
      }).catch(e => {
        console.log(e)
      })
  }, [])


  const handleBankChange = (e) => {
    const bank_code = e.target.value;
    setBankCode(bank_code);
    console.log("Selected bank code:", bank_code);
    console.log(bank_code)


    const requestData = {
      account_number: account_number,
      bank_code: bank_code
    };

    axios.get("https://api-chow.onrender.com/api/bank/verify", {
      headers: headers,
      params: requestData
    })
      .then(response => {
        console.log(response.data.data[0].account_name);
        setAccountName(response.data.data[0].account_name)
        setInvalid(false)
      })
      .catch(error => {
        console.error(error);
        setInvalid(true)
        setAccountName('')
      });
  }


  const handleName = (e) => {
    e.preventDefault()
    // verify

  }


  return (
    <div>
      <div className="vendor-container-withdrawal">
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
                  <span className="dash-text">Withdrawal</span> <br />
                  <span className="profile-date">{vendorUsername}</span>
                </div>
              </div>

              {/* profile */}
              <div className="withdrawal-cart-container">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="withdrawal-contents">
                      <div className="withdrawal-form-setting">
                        <form>
                          <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <div className="mb-3 input-div">
                                <label htmlFor="account_number" className="form-label label-text-withdrawal">Account Number</label>
                                <input type="text" style={{ border: "1.34px solid black", width: "100%" }}
                                  className="form-control withdrawal-input-vendor"
                                  id="account_number"
                                  placeholder="0000000000"
                                  name='account_number'
                                  value={account_number}
                                  onChange={e => setAccountNumber(e.target.value)}
                                />
                              </div>
                              <div className="mb-3 input-div">
                                <label htmlFor="bankName" className="form-label label-text-withdrawal">Bank Name</label>
                                <br />
                                <div>
                                  <select name="bank-names" id="bankNames" className="bank-names" onChange={handleBankChange}>
                                    <option className="bank-name">Choose bank...</option>
                                    <option className="bank-name"></option>
                                    {
                                      getBanks.map((bank) => (
                                        <option key={bank.name} value={bank.code} className="bank-name">{bank.name}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                              <div className="mb-3 input-div">
                                <label htmlFor="accountName" className="form-label label-text-withdrawal">Account Name</label>
                                <input type="text" style={{ border: "1.34px solid black", width: "100%", fontWeight: "700", fontFamily: "Poppins" }}
                                  className="form-control withdrawal-input-vendor"
                                  id="accountName"
                                  placeholder="Account Name"
                                  name='accountName'
                                  value={accountName}
                                  // onChange={e => setAccountName(e.target.value)}
                                  disabled
                                ></input>
                                {invalid ? (
                                  <span className='invalid-account-name'>Invalid Account Number</span>
                                ) : ""}
                              </div>
                              <div className="mb-3 input-div">
                                <label htmlFor="amount" className="form-label label-text-withdrawal">Amount</label>
                                <input type="text" style={{ border: "1.34px solid black", width: "100%", fontWeight: "700", fontFamily: "Poppins" }}
                                  className="form-control withdrawal-input-vendor"
                                  id="amount"
                                  placeholder="Amount"
                                  name='amount'
                                  value={amount}
                                  onChange={e => setAmount(e.target.value)}
                                />
                              </div>
                              <div className="mb-3 input-div">
                                <label htmlFor="pin" className="form-label label-text-withdrawal">Withdrawal Pin</label>
                                <input type="password" style={{ border: "1.34px solid black", width: "100%" }}
                                  className="form-control withdrawal-input-vendor"
                                  id="pin"
                                  placeholder="****"
                                  name='pin'
                                  value={withdrawalPin}
                                  onChange={e => setWithdrawalPin(e.target.value)}
                                />
                              </div>
                              <button className='btn btn-danger save-btn-profile withdrawal-btn' onClick={handleName}>Withdrawal</button>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid >
          </Grid >
        </div >
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

export default VendorWithdrawal
