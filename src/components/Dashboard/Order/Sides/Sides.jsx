import React, { useEffect, useState } from 'react'
import './Sides.css'
import { BsCartDashFill } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Sides = ({ size, handleClick, setShow, cart, setCart }) => {

  const [count, setCount] = useState(1);
  const [countOne, setCountOne] = useState(1);
  const [drink, setDrink] = useState(false)
  const [drinks, setDrinks] = useState([])
  const history = useHistory()
  const [activeNav, setActiveNav] = useState('')
  const [loading, setLoading] = useState(false)
  const [clickedButtons, setClickedButtons] = useState([]);

  // Function to handle button click and update clicked buttons
  const handleClickChange = (item) => {
    if (!clickedButtons.includes(item._id)) {
      setClickedButtons((prevClickedButtons) => [...prevClickedButtons, item._id]);
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };


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

  const vendorId = localStorage.getItem("vendor-id");

  useEffect(() => {
    axios.get(`https://api-chow.onrender.com/api/vendors/menu/sides/${vendorId}`)
      .then(res => {
        console.log(res.data.data)
        setDrinks(res.data.data)
        setLoading(true)
      }).catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <div>
      <div className="container-drink">

        <div className="main-body">
          {
            loading ? (<Grid container spacing={2}>

              {
                drinks.map(item => (
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <div key={item._id} className="cart-main-drink">
                      <div className="main-drink">
                        <img src={`https://api-chow.onrender.com/static/${item.food_id}.jpg`} alt="food-img" className='cart-img-chow' />
                        <span className='drink-name'>{item.food_name}
                          <span className="drink-price">₦ {item.price}.00</span>
                          {/* <span className="drink-qty">
                            <span className='drink-arrow'><AiOutlineMinus onClick={() => setCountOne(countOne - 1)} /></span>
                            <span className='count-inc'>{countOne}</span>
                            <span className='drink-arrow'><AiOutlinePlus onClick={() => setCountOne(countOne + 1)} /></span>
                          </span> */}
                        </span>
                      </div>
                      <div className="button-cart">
                        <button
                          className={clickedButtons.includes(item._id) ? 'btn-cart-green' : 'btn-cart-red'}
                          onClick={() => {
                            handleClickChange(item)
                            handleClick(item)
                          }}>
                          {clickedButtons.includes(item._id) ? 'Added to Cart' : 'Add to Cart'}
                        </button>
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

export default Sides
