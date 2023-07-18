import React, { useEffect, useState } from 'react'
import './Specials.css'
import Img from '../../../../assets/special.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { BsCartDashFill } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import Special from '../../../../assets/special.png'
import { Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import axios from 'axios'

const Specials = ({ handleClick, setShow, size }) => {

  const [count, setCount] = useState(1);
  const [countOne, setCountOne] = useState(1);
  const [special, setSpecial] = useState(false)
  const [specials, setSpecials] = useState([])
  const history = useHistory()
  const [activeNav, setActiveNav] = useState('')
  const [loading, setLoading] = useState(false)

  if (countOne < 1) {
    setCountOne(1)
  }

  if (count < 1) {
    setCount(1)
  }

  const handleDrink = () => {
    history.push("/drink")
  }

  const handleMainFood = () => {
    history.push("/main-food")
  }

  const handleSpecialRed = () => {
    setSpecial(true)
  }

  const handleHome = () => {
    history.push('/dashboard')
  }

  let specialColor = [];

  if (special) {
    specialColor.push('specials-red')
  } else {
    specialColor.push('specials')
  }

  const handleProfile = () => {
    history.push('/profile')
  }

  const vendorId = localStorage.getItem("vendor-id");

  useEffect(() => {
    axios.get(`https://api-chow.onrender.com/api/vendors/menu/specials/${vendorId}`)
      .then(res => {
        console.log(res.data.data)
        setSpecials(res.data.data)
        setLoading(true)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="container-special">
        {/* <div className="container-nav">
          <div className="logo-img" onClick={() => setShow(true)}>
            <img src={Img} alt="logo img" />
          </div>
          <div className="nav-icons">
            <span className="nav-icon"><CiUser /></span>
            <span className="nav-icon"><CiSearch /></span>
            <span className="nav-icon" onClick={() => setShow(false)}><CiShoppingCart /></span>
            <span className='cart-size'>{size}</span>
          </div>
          <div className='bottom-line'></div>
          <div className="categories">
            <span className="main" onClick={handleMainFood}>Main food</span>
            <span className="specials" onClick={handleDrink}>Drinks</span>
            <span className={specialColor} onClick={handleSpecialRed}>Specials</span>
          </div>
          <div className='bottom-line' style={{ bottom: '0' }}></div>
        </div> */}

        <div className="main-body">
          {
            loading ? (<Grid container spacing={2}>

              {
                specials.map(item => (
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <div key={item._id} className="cart-main-special">
                      <div className="main-special">
                        <img src={Img} alt="" />
                        <span className='special-name'>{item.food_item}
                          <span className="special-price">₦ {item.price}.00</span>
                          {/* <span className="special-qty">
                            <span className='special-arrow'><AiOutlineMinus onClick={() => setCountOne(countOne - 1)} /></span>
                            <span className='special-count'>{countOne}</span>
                            <span className='special-arrow'><AiOutlinePlus onClick={() => setCountOne(countOne + 1)} /></span>
                          </span> */}
                        </span>
                      </div>
                      <div className='button-cart'>
                        <button className='btn-cart' onClick={() => handleClick(item)}>Add to Cart</button>
                      </div>
                    </div>
                  </Grid>
                ))
              }

            </Grid>) : (
              <div class="ring">Loading
                <span className='loading-ring'></span>
              </div>
            )
          }
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

export default Specials
