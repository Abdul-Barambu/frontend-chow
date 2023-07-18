import React, { useEffect, useState } from 'react'
import './NavBar.css'
import Img from '../../../../assets/logo.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { BsCartDashFill } from 'react-icons/bs'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import MainFood from '../MainFood/MainFood'
import Drinks from '../Drinks/Drinks'
import Specials from '../Specials/Specials'

const NavBar = ({ size, handleClick, setShow }) => {

  const [main, setMain] = useState(false)
  const history = useHistory()
  const [activeNav, setActiveNav] = useState('')


  const handleDrink = () => {
    history.push("/order-drinks")
  }

  const handleSpecial = () => {
    history.push("/order-specials")
  }

  const handleMain = () => {
    history.push("/order-main")
  }

  let mainColor = [];

  if (main) {
    mainColor.push('main-red')
  } else {
    mainColor.push('main')
  }

  const handleFood = () => {
    history.push("/order-main")
  }

  const handleProfile = () => {
    history.push('/profile')
  }

  const handleBack = () => {
    history.push("/dashboard")
  }

  const handleCart = () => {
    history.push("/main-cart")
  }

  useEffect(() => {
    handleFood();
  }, [])

  return (
    <div>
      <div className="container-navbar">
        <div className="container-nav-bar">
          <div className="logo-img" onClick={() => setShow(false)}>
            <img src={Img} alt="logo img" onClick={handleBack} style={{cursor: 'pointer'}} />
          </div>
          <div className="nav-icons">
            <span className="nav-icon" onClick={handleProfile}><CiUser /></span>
            <span className="nav-icon"><CiSearch /></span>
            <span className="nav-icon" onClick={() => {setShow(false) }}><CiShoppingCart /></span>
            <span className='cart-size'>{size}</span>
          </div>
          <div className='bottom-line'></div>
          <div className="categories">
            <span className={mainColor} onClick={handleMain}>Main food</span>
            <span className='drinks' onClick={handleDrink}>Drinks</span>
            <span className="specials" onClick={handleSpecial}>Specials</span>
          </div>
          <div className='bottom-line' style={{ bottom: '0' }}></div>
        </div>

        {/* <MainFood handleClick={handleClick}/> */}

        {/* Nav */}
        <nav>
          <a href='#' onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><AiTwotoneHome />
            <span onClick={() => setActiveNav('#')} className={activeNav === '#' ? '' : 'none'}>Home</span></a>

          <a href='#a' onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : ''}><CiSearch />
            <span onClick={() => setActiveNav('#a')} className={activeNav === '#a' ? 'active' : 'none'}>Search</span></a>

          <span className='cart-size-nav'>{size}</span>
          <a href='#b' onClick={() => {
            setActiveNav('#b')
            setShow(false)
          }} className={activeNav === '#b' ? 'active' : ''}><BsCartDashFill />
            <span onClick={() => {
              setActiveNav('#b')
              setShow(false)
            }} className={activeNav === '#b' ? 'active' : 'none'}>Cart</span></a>

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

export default NavBar
