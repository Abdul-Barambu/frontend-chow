import React, { useEffect, useState } from 'react'
import './MainFood.css'
import Img from '../../../../assets/logo.png'
import Meal from '../../../../assets/food.png'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { BsCartDashFill } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const MainFood = ({ handleClick, setShow, size }) => {

  const [count, setCount] = useState(100);
  const [countOne, setCountOne] = useState(100);
  const [main, setMain] = useState(false)
  const [food, setFood] = useState([])
  const history = useHistory()
  const [activeNav, setActiveNav] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleDrink = () => {
    history.push("/drink")
  }

  const handleSpecial = () => {
    history.push("/special")
  }

  const handleMainColor = () => {
    setMain(true)
  }

  const handleHome = () => {
    history.push('/dashboard')
  }

  let mainColor = [];

  if (main) {
    mainColor.push('main-red')
  } else {
    mainColor.push('main')
  }


  const handleProfile = () => {
    history.push('/profile')
  }

  // const storedItemIds = localStorage.getItem('itemIds');

  // // All IDs
  // useEffect(() => {

  //   if (storedItemIds) {
  //     const itemIds = JSON.parse(storedItemIds);
  //     itemIds.forEach(id => {
  //       console.log(id);
  //     });
  //   }
  // }, []);

  const vendorId = localStorage.getItem("vendor-id");


  useEffect(() => {
    axios.get(`https://api-chow.onrender.com/api/vendors/menu/meals/${vendorId}`)
      .then(res => {
        console.log(res.data.data)
        setFood(res.data.data)
        setLoading(true)
      }).catch(err => {
        console.log(err)
      })
  }, [])



  return (
    <div>
      <div className="container-food">
        {/* <div className="container-nav">
          <div className="logo-img" onClick={() => setShow(false)}>
            <img src={Img} alt="logo img" />
          </div>
          <div className="nav-icons">
            <span className="nav-icon"><CiUser /></span>
            <span className="nav-icon"><CiSearch /></span>
            <span className="nav-icon"  onClick={() => setShow(false)}><CiShoppingCart /></span>
            <span className='cart-size'>{size}</span>
          </div>
          <div className='bottom-line'></div>
          <div className="categories">
            <span className={mainColor} onClick={handleMainColor}>Main food</span>
            <span className='drinks' onClick={handleDrink}>Drinks</span>
            <span className="specials" onClick={handleSpecial}>Specials</span>
          </div>
          <div className='bottom-line' style={{ bottom: '0' }}></div>
        </div> */}
        <div className='main-body'>

          {
            loading ? (<Grid container spacing={2}>
              {
                food.map(item => (
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <div key={item._id} className="cart-main-food">
                      <div className="main-food">
                        <img src={`https://api-chow.onrender.com/static/${item.food_id}.jpg`} alt="food-img" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                        <span className='food-name'>{item.food_name}
                          <span className="special-price">₦ {item.price}.00</span>
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

export default MainFood
