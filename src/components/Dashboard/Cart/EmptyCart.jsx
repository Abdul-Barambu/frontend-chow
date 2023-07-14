import React, {useState} from 'react'
import './EmptyCart.css'
import Img from '../../../assets/logo.png'
import EC from '../../../assets/empty-cart.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import { BsCartDashFill } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

const EmptyCart = () => {

    
  const [activeNav, setActiveNav] = useState('')

    return (
        <div>
            <div className='container-Empty-cart'>
                <div className="container-nav">
                    <div className="logo-img">
                        <img src={Img} alt="logo img" />
                    </div>
                    <div className="nav-icons">
                        <span className="nav-icon"><CiUser /></span>
                        <span className="nav-icon"><CiSearch /></span>
                        <span className="nav-icon"><CiShoppingCart /></span>
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>
                <div className="main-e-cart">
                    <img src={EC} alt="empty-cart" className='empty-cart' />
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
                    <span onClick={() => setActiveNav('#c')} className={activeNav === '#c' ? 'active' : 'none'}>Profile</span></a>
            </nav>
        </div>
    )
}

export default EmptyCart
