import React from 'react'
import './Budget.css'
import Img from '../../../assets/logo.png'
import { CiUser } from 'react-icons/ci'
import { CiSearch } from 'react-icons/ci'
import { CiShoppingCart } from 'react-icons/ci'
import {useHistory} from 'react-router-dom'

const Budget = () => {
    
    const history = useHistory()

    const handleHome = () => {
        history.push('/dashboard')
    }

  return (
    <div>
      <div className="profile-container">
                <div className="profile-nav-bar">
                    <div className="profile-logo-img" >
                        <img src={Img} alt="logo img" onClick={handleHome} style={{cursor: 'pointer'}} />
                    </div>
                    <div className="nav-icons">
                        <span className="nav-icon"><CiUser /></span>
                        <span className="nav-icon" ><CiShoppingCart /></span>
                    </div>
                    <div className='bottom-line' style={{ bottom: '0' }}></div>
                </div>

                {/* Main Body */}
                <div className="budget-main-body">
                    <div className="budget-coming">
                        <h1 className="coming-soon">Budget coming soon...</h1>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Budget
