import React, { useState } from 'react';
import './Registration.css';
import './success.css'
import UserService from '../../Services/UserService'
import Logo from '../../assets/logo.png'
import Rec from '../../assets/Rectangle.png'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Registration = () => {

    const [visible, setVisible] = useState(false)

    const [firstname, setFName] = useState("")
    const [lastname, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(false)
    const history = useHistory()
    const user = { firstname, lastname, email, username, password }

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleClick = () => {
        history.push("/")
    }

    const handleSubmit = (e) => {
        setButton(true);
        e.preventDefault()
         axios.post('https://chow.onrender.com/API/v1/register',user).then(res => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Signup complete',
                    text: 'Your account has been Successfully setup, Login to continue'
                })
                history.push("/")

            }).catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Error occurred while registering, TRY AGAIN!!!'
                })
                setButton(false);
                history.push('/registration')
            })
    }

    let opacity = [];

    if (button) {
        opacity.push('btn-sign-opacity')
    } else {
        opacity.push('btn-sign')
    }


    return (
        <div>
            <div className="container-reg">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <div className="in-container">
                                <div className="img-logo">
                                    <img src={Logo} alt="logo" />
                                </div>
                                <div className="text">
                                    <text className='create'>Create an Account</text>
                                    <p className="text-paragraph">Let's get you started with a 30 days free trial.</p>
                                </div>
                                <div className="form">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label label-text">First Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Okomayin"
                                            name='firstname'
                                            value={firstname}
                                            onChange={(e) => setFName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label label-text">Last Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Onaivi"
                                            name='lastname'
                                            value={lastname}
                                            onChange={(e) => setLName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label label-text">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Onaivi@gmail.com"
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label label-text">Username</label>
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Okomayin123"
                                            name='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label label-text">Password</label>
                                        <input type={visible ? "text" : "password"}
                                            className="form-control"
                                            id="password" placeholder="**********"
                                            name='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="icon" className='eye-icon' onClick={handleVisible}>{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
                                    </div>
                                </div>
                                <div className="terms">
                                    <input type="checkbox" className='input-check' /> <span className="terms-text">I agree to the terms & conditions</span>
                                </div>
                                <div className="button">
                                    <button type="Submit" value={button} className={opacity}>Sign up</button>
                                </div>
                                <div className='already'>
                                    <span className="login-text">Already have an account? <span style={{ color: '#D21A32', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleClick}>Login</span></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <img src={Rec} alt="Rectangle food pic" className='img-fluid' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Registration

