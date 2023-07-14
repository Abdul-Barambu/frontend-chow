import React from 'react'
import './LeftSide.css'
import Logo from '../../../assets/logo.png'
import { AiOutlineHome } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'


const LeftSide = () => {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.clear();
        history.push('/')
      }

    return (
        <div>
            <div className="container-left">
                <div className="img-logo">
                    <img src={Logo} alt="img-logo" className='logo-img' />
                </div>

                {/* NAV ICONS */}
                {/* start */}
                <div style={{ marginLeft: '10px' }}>
                    <div className="icon-container">
                        <div className="icon-body">
                            <AiOutlineHome className='icon' />
                        </div>
                    </div>
                </div>
                {/* end */}

                {/* start */}
                <div style={{ marginLeft: '10px' }}>
                    <div className="icon-container">
                        <div className="icon-body">
                            <IoIosNotificationsOutline className='icon' />
                        </div>
                    </div>
                </div>
                {/* end */}

                {/* start */}
                <div style={{ marginLeft: '10px' }}>
                    <div className="icon-container">
                        <div className="icon-body">
                            <AiOutlineSetting className='icon' />
                        </div>
                    </div>
                </div>
                {/* end */}

                {/* logout */}
                <div className="logout">
                    <HiOutlineLogout className='logout-icon' onClick={handleLogout} style={{cursor: 'pointer'}}/>
                </div>

            </div>

        </div>
    )
}

export default LeftSide
