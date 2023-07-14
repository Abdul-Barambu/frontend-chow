import React, { useState } from 'react'
import './ResetPassword.css'
import Logo from '../../assets/logo.png'
import Rec from '../../assets/Rectangle2.png'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

const ResetPassword = () => {

    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(false)

    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")


    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            <div className="container-reset">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="in-container-reset">
                            <div className="img-logo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="text">
                                <text className='reset'>Reset Password</text>
                                <p className="text-paragraph">Please fill in the password field below to reset your password.</p>
                            </div>
                            <div className="form">
                                <div className="mb-3">
                                    <label for="password" className="form-label label-text">New Password</label>
                                    <input type={visible ? "text" : "password"}
                                        className="form-control"
                                        id="password" placeholder="**********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="icon" className='eye-icon' onClick={handleVisible}>{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
                                </div>
                                <div className="mb-3">
                                    <label for="cpassword" className="form-label label-text">Confrim Password</label>
                                    <input type={show ? "text" : "password"}
                                        className="form-control"
                                        id="cpassword" placeholder="**********"
                                        value={cpassword}
                                        onChange={(e) => setCPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="icon" className='eye-icon' onClick={handleShow}>{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
                                </div>
                            </div>
                            <div className="button">
                                <button type="Submit" className="btn-send">Send</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={Rec} alt="Rectangle food pic" className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
