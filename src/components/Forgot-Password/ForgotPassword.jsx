import React, {useState} from 'react'
import './ForgotPassword.css'
import Logo from '../../assets/logo.png'
import Rec from '../../assets/Rectangle2.png'
import axios from 'axios'
import Swal from 'sweetalert2'

const ForgotPassword = () => {
    
    const [email, setEmail] = useState("");
    const [button, setButton] = useState(false);

    const handleClick = (e) => {
        setButton(true)
        e.preventDefault();

        axios.post('https://chow.onrender.com/API/v1/forgetPassword', {email})
        .then(res => {
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: 'EMAIL SENT',
                text: 'A reset password link has been sent to your email'
            })
            setButton(false)
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'EMAIL NOT FOUND',
                text: 'Please enter a correct and registered email'
            })
            setButton(false)
        })
    }

    let opacity = [];
    if(button){
        opacity.push('btn-sign-opacity')
    }else{
        opacity.push('btn-sign')
    }

    return (
        <div>
            <div className="container-forgot">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="in-container-forgot">
                            <div className="img-logo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="text">
                                <text className='F-password'>Forgot Password</text>
                                <p className="text-paragraph">Please fill in the email field below,
                                    we’ll send you an email to reset your password.
                                </p>
                            </div>
                            <div className="form">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label label-text">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Onaivi@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="button">
                                    <button type="Submit" className={opacity} onClick={handleClick}>Send</button>
                                </div>
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

export default ForgotPassword
