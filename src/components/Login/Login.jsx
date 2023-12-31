import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import Logo from '../../assets/logo.png'
import Rec from '../../assets/Rectangle2.png'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {

    let opacity = [];

    const [visible, setVisible] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(false)

    const history = useHistory();


    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleClick = () => {
        history.push("/registration")
    }

    const handleClickForgot = () => {
        history.push("/forgot-password")
    }

    const handleLogin = async (e) => {
        setButton(true)
        e.preventDefault();

        await axios.post('https://chow.onrender.com/api/v1/login', {
            username: username,
            password: password

        }, { withCredentials: true }).then(response => {
            console.log(response.data.data.role)

            localStorage.setItem("role", response.data.data.role)

            const userRole = localStorage.getItem("role")

            if (userRole === "vendor") {

                localStorage.setItem("Access-Token-vendor", response.data.val.acessToken)
                localStorage.setItem("Refresh-Token-vendor", response.data.val.refreshToken)
                localStorage.setItem("Vendor-Id", response.data.data.userId)
                localStorage.setItem("vendor-username", username)

                //vendor balance API

                const accessToken = localStorage.getItem("Access-Token-vendor");

                const headers = {
                    Authorization: `Bearer ${accessToken}`
                };
                axios.get("https://api-chow.onrender.com/api/vendors/user", { headers })
                    .then(res => {
                        console.log(res)
                        localStorage.setItem("Vendor-Balance", res.data.data.balance)
                        localStorage.setItem("Total-Ordered", res.data.data.total_orders_served)

                        // Set a unique key in localStorage to indicate successful login
                        const uniqueKey = `loggedIn_${Date.now()}`;
                        localStorage.setItem(uniqueKey, "true");


                        history.push("/vendor-dashboard")
                    }).catch(e => {
                        console.log(e)
                    })
            } else if (userRole === "student") {

                localStorage.setItem("Access-Token", response.data.val.acessToken)
                localStorage.setItem("Refresh-Token", response.data.val.refreshToken)
                localStorage.setItem("User-Id", response.data.data.userId)
                localStorage.setItem("student-username", username)

                // Set a unique key in localStorage to indicate successful login
                const uniqueKey = `loggedIn_${Date.now()}`;
                localStorage.setItem(uniqueKey, "true");

                history.push('/dashboard')
            }

            // AUTH ERROR
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'You have not been authenticated'
                });
                setButton(false)
            }

        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Invalid Username / Password OR Check your network'
            });
            setButton(false)
            console.log(error)
        })

    }

    if (button) {
        opacity.push('btn-sign-opacity')
    } else {
        opacity.push('btn-sign')
    }

    return (
        <div>
            <div className="container-login">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="in-container">
                            <div className="img-logo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="text">
                                <small className='welcome'>Welcome Back!</small>
                            </div>
                            <div className="form">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label label-text">Username</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Okomayin123"
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="icon" className='eye-icon' onClick={handleVisible}>{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
                                </div>
                            </div>
                            <div className="terms">
                                <input type="checkbox" className='input-check' /> <span className="remember-text">Remember me</span>
                                <span className='forgot-password' onClick={handleClickForgot}>Forgot password</span>
                            </div>
                            <div className="button">
                                <button type="Submit" value={button} className={opacity} onClick={handleLogin}>Log In</button>
                            </div>
                            <div className='already'>
                                <span className="login-text">Don’t have an account? <span style={{ color: '#D21A32', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleClick}>Sign up</span></span>
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

export default Login
