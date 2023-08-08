import React, { useEffect, useState } from 'react'
import './MainFood.css'
import { BsCartDashFill } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
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
  const [clickedButtons, setClickedButtons] = useState([]);

  // Function to handle button click and update clicked buttons
  const handleClickChange = (itemId) => {
    if (!clickedButtons.includes(itemId)) {
      setClickedButtons((prevClickedButtons) => [...prevClickedButtons, itemId]);
    }
  };
  

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
                      <div className="button-cart">
                        <button
                          className={clickedButtons.includes(item._id) ? 'btn-cart-green' : 'btn-cart-red'}
                          onClick={() => {
                            handleClickChange(item._id)
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

export default MainFood
