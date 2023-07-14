import React, { useEffect, useState } from 'react'
import './Drinks.css'
import Img from '../../../../assets/drink.png'
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
import NavBar from '../nav/NavBar'
import axios from 'axios'

const Drinks = ({ size, handleClick, setShow }) => {

  const [count, setCount] = useState(1);
  const [countOne, setCountOne] = useState(1);
  const [drink, setDrink] = useState(false)
  const [drinks, setDrinks] = useState([])
  const history = useHistory()
  const [activeNav, setActiveNav] = useState('')

  if (countOne < 1) {
    setCountOne(1)
  }

  if (count < 1) {
    setCount(1)
  }

  const handleMainFood = () => {
    history.push("/main-food")
  }

  const handleSpecial = () => {
    history.push("/special")
  }

  const handleDrinkRed = () => {
    setDrink(true)
  }

  const handleHome = () => {
    history.push('/dashboard')
  }

  let drinkColor = [];

  if (drink) {
    drinkColor.push('drinks-red')
  } else {
    drinkColor.push('drinks')
  }

  
  const handleProfile = () => {
    history.push('/profile')
  }

  useEffect(() => {
    axios.get("https://api-chow.onrender.com/api/vendors/menu/drinks/646386e9953bb570f2bd3102")
      .then(res => {
        console.log(res.data.data)
        setDrinks(res.data.data)
      }).catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <div>
      <div className="container-drink">
        {/* <div className="container-nav">
          <div className="logo-img" onClick={() => setShow(false)}>
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
            <span className={drinkColor} onClick={handleDrinkRed}>Drinks</span>
            <span className="specials" onClick={handleSpecial}>Specials</span>
          </div>
          <div className='bottom-line' style={{ bottom: '0' }}></div>
        </div> */}

        {/* <NavBar size={size} setShow={setShow}/> */}

        <div className="main-body">
          <Grid container spacing={2}>

            {
              drinks.map(item => (
                <Grid item lg={3} md={4} sm={4} xs={12}>
                  <div key={item._id} className="cart-main-drink">
                    <div className="main-drink">
                    <img src={`https://api-chow.onrender.com/static/${item.food_id}.jpg`} alt="food-img" style={{width: '100px', height: '100px'}} />
                      <span className='drink-name'>{item.food_name}
                        <span className="drink-price">₦ {item.price}.00</span>
                        {/* <span className="drink-qty">
                          <span className='drink-arrow'><AiOutlineMinus onClick={() => setCountOne(countOne - 1)} /></span>
                          <span className='count-inc'>{countOne}</span>
                          <span className='drink-arrow'><AiOutlinePlus onClick={() => setCountOne(countOne + 1)} /></span>
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


          </Grid>
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

export default Drinks
