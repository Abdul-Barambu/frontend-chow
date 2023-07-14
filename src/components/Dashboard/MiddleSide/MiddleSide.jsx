import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './MiddleSide.css'
import Logo from '../../../assets/logo.png'
import { BiSearch } from 'react-icons/bi'
import { MdLocalAtm } from 'react-icons/md'
import { BsWalletFill } from 'react-icons/bs'
import img4 from '../../../assets/image 4.png'
import { AiOutlineHome } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'
import img from '../../../assets/image 4.png'
import Cookies from 'universal-cookie'
import axios from 'axios'

const MiddleSide = () => {

  const cookies = new Cookies();

  const [value, setValue] = useState('')
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [balances, setBalances] = useState([]);
  const history = useHistory()

  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();

  const handleOrder = () => {
    history.push("/order")
  }

  const accessToken = localStorage.getItem("Access-Token");
  const refreshToken = localStorage.getItem("Refresh-Token");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Cookies: `refreshToken=${refreshToken}`,
  };

  useEffect(() => {
    axios.get('https://chow.onrender.com/api/v1/getAllVendorsAccount', { headers })
      .then(response => {
        console.log(response)
        setUsers(response.data.data)
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  useEffect(() => {
    axios.get('https://chow.onrender.com/api/v1/getSingleAccountBalance/646bcaccb4abc11221ed4edc', { headers })
      .then(response => {
        setBalances(response.data.data)
        console.log(response.data.data.bal)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  let display = [];

  if (modal) {
    display.push('container-middle-on')
  }
  else {
    display.push('container-middle-off')
  }

  const fixedOrder = () => {
    history.push("/order")
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push('/')
  }

  return (
    <div>
      <div className="img-container-middle">
        <img src={Logo} alt="img-logo" className='logo-img-middle' />
        <div className="logout-middle">
          <HiOutlineLogout className='logout-icon-middle' onClick={handleLogout} style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <div className={display} >
        {/* Name and SearchBar */}
        <div className="row">
          <div className=" col-6 col-sm-6 col-lg-6 column-name">
            <h1 className="name">Welcome to chow</h1>
            <p className="date">{date} - {time}</p>
          </div>
          <div className="col-6 col-sm-6 col-lg-6 ">
            <div className="search-bar">
              <BiSearch className='search-icon' />
              <input type="search"
                placeholder='Search for food, coffe, etc..'
                className='search-input'
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* hr line */}
        <div className="row">
          <div className="col-lg-8">
            <hr />
          </div>
        </div>
        {/* below hr line */}
        <div className="row">
          <div className="col-6 col-sm-6 col-lg-6">
            <div className="choose-vendor">
              <h2 className="choose">Choose Vendor</h2>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-lg-6">
            <div className="balance">
              <div className="row">
                <div className="col-6 col-sm-6 col-lg-6">
                  <h6 className="wallet">
                    <BsWalletFill />
                  </h6>
                </div>
                <div className="col-6 col-sm-6 col-lg-6">
                  <h6 className="atm">
                    <MdLocalAtm />
                  </h6>
                </div>
              </div>
              <div className="amount">
                N0.00
                {/* {balances.map(balance => {
                  return (
                    <div key={balance.id}>
                      <div>{balance.data}</div>
                    </div>
                  )
                })} */}
              </div>
            </div>
          </div>
        </div>

        {/* order-cart */}


        <div className="scroll">
          <div className="order-cart-display">

            {
              users.map(user => {
                return (
                  <div key={user.id}>
                    <div className="order-cart">
                      <div className="img-cart-text">
                        <img src={img4} alt="Food Image" className="image-4" />
                        <p className="vendor-text">{user.username}</p>
                        <p className="bowl-text">20 Bowls available</p>
                        <button className="order-btn" onClick={handleOrder}>Order now</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* ORDER */}
        {modal && (
          <div className="order-container">
            <div className="inside-container">
              <div className="packs">
                <select name="pakcs" id="packs">
                  <option value="choose">Choose pack...</option>
                  <option value=""></option>
                  <option value="small">Small</option>
                  <option value="big">Big</option>
                  <option value="plastic">Plastic</option>
                </select>
              </div>
              <div className="line-break">
                <hr />
              </div>
              <div className="container-body">
                <div className="food-name">
                  <img src={img} alt="food-img" className='food-name-img' />
                  <p className="food-name-text">Spicy seasoned sea...</p>
                  <select name="food-price" id="f-price" className="food-price">
                    <option value="f-proce" className='option-text'>Price...</option>
                    <option value="one" className='option-text'>100</option>
                    <option value="two" className='option-text'>200</option>
                    <option value="three" className='option-text'>300</option>
                    <option value="four" className='option-text'>400</option>
                    <option value="five" className='option-text'>500</option>
                    <option value="six" className='option-text'>600</option>
                    <option value="seven" className='option-text'>700</option>
                    <option value="eight" className='option-text'>800</option>
                    <option value="nine" className='option-text'>900</option>
                    <option value="thousand" className='option-text'>1000</option>
                  </select>
                </div>
                <div className="order-note">
                  <span className="order-qty">
                    <select name="qty" id="qty" className="select-qty">
                      <option value="qty" className="option-qty">QTY</option>
                      <option value="q-one" className="option-qty">1</option>
                      <option value="q-two" className="option-qty">2</option>
                      <option value="q-three" className="option-qty">3</option>
                      <option value="q-four" className="option-qty">4</option>
                      <option value="q-five" className="option-qty">5</option>
                      <option value="q-six" className="option-qty">6</option>
                      <option value="q-seven" className="option-qty">7</option>
                      <option value="q-eight" className="option-qty">8</option>
                      <option value="q-nine" className="option-qty">9</option>
                      <option value="q-ten" className="option-qty">10</option>
                    </select>
                  </span>
                </div>
              </div>
              <div className="container-body-2">
                <div className="food-name">
                  <img src={img} alt="food-img" className='food-name-img' />
                  <p className="food-name-text">Spicy seasoned sea...</p>
                  <select name="food-price" id="f-price" className="food-price">
                    <option value="f-proce" className='option-text'>Price...</option>
                    <option value="one" className='option-text'>100</option>
                    <option value="two" className='option-text'>200</option>
                    <option value="three" className='option-text'>300</option>
                    <option value="four" className='option-text'>400</option>
                    <option value="five" className='option-text'>500</option>
                    <option value="six" className='option-text'>600</option>
                    <option value="seven" className='option-text'>700</option>
                    <option value="eight" className='option-text'>800</option>
                    <option value="nine" className='option-text'>900</option>
                    <option value="thousand" className='option-text'>1000</option>
                  </select>
                </div>
                <div className="order-note">
                  <span className="order-qty">
                    <select name="qty" id="qty" className="select-qty">
                      <option value="qty" className="option-qty">QTY</option>
                      <option value="q-one" className="option-qty">1</option>
                      <option value="q-two" className="option-qty">2</option>
                      <option value="q-three" className="option-qty">3</option>
                      <option value="q-four" className="option-qty">4</option>
                      <option value="q-five" className="option-qty">5</option>
                      <option value="q-six" className="option-qty">6</option>
                      <option value="q-seven" className="option-qty">7</option>
                      <option value="q-eight" className="option-qty">8</option>
                      <option value="q-nine" className="option-qty">9</option>
                      <option value="q-ten" className="option-qty">10</option>
                    </select>
                  </span>
                </div>
              </div>
              <div className="container-body-3">
                <div className="food-name">
                  <img src={img} alt="food-img" className='food-name-img' />
                  <p className="food-name-text">Spicy seasoned sea...</p>
                  <select name="food-price" id="f-price" className="food-price">
                    <option value="f-proce" className='option-text'>Price...</option>
                    <option value="one" className='option-text'>100</option>
                    <option value="two" className='option-text'>200</option>
                    <option value="three" className='option-text'>300</option>
                    <option value="four" className='option-text'>400</option>
                    <option value="five" className='option-text'>500</option>
                    <option value="six" className='option-text'>600</option>
                    <option value="seven" className='option-text'>700</option>
                    <option value="eight" className='option-text'>800</option>
                    <option value="nine" className='option-text'>900</option>
                    <option value="thousand" className='option-text'>1000</option>
                  </select>
                </div>
                <div className="order-note">
                  <span className="order-qty">
                    <select name="qty" id="qty" className="select-qty">
                      <option value="qty" className="option-qty">QTY</option>
                      <option value="q-one" className="option-qty">1</option>
                      <option value="q-two" className="option-qty">2</option>
                      <option value="q-three" className="option-qty">3</option>
                      <option value="q-four" className="option-qty">4</option>
                      <option value="q-five" className="option-qty">5</option>
                      <option value="q-six" className="option-qty">6</option>
                      <option value="q-seven" className="option-qty">7</option>
                      <option value="q-eight" className="option-qty">8</option>
                      <option value="q-nine" className="option-qty">9</option>
                      <option value="q-ten" className="option-qty">10</option>
                    </select>
                  </span>
                </div>
              </div>

              <div className="fixed-food">
                <button className="continue" onClick={fixedOrder}>Click here for fixed foods</button>
              </div>
              <div className="line-break-total">
                <hr />
              </div>

              {/* Total */}
              <div className="total">
                <div className="discount">
                  <div className="discount-text">Discount</div>
                  <div className="discount-amount">₦0</div>
                </div>
                <div className="total-amount">
                  <div className="total-text">Subtotal</div>
                  <div className="sub-total-amount">₦5870</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="buttons">
                <button className="back" onClick={handleOrder}>Go back</button>
                <button className="continue">Continue to payment</button>
              </div>
            </div>
          </div>

        )}

        {/* Nav */}
        <nav>
          <a href="#"><AiOutlineHome /></a>
          <a href="#"><IoIosNotificationsOutline /></a>
          <a href="#"><AiOutlineSetting /></a>
        </nav>
      </div>
    </div>
  )
}

export default MiddleSide
