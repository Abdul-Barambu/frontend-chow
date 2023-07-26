import React, { useState } from 'react'
import './Payment.css'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ProceedPayment from './ProceedPayment'
import Swal from 'sweetalert2'

const Payment = ({ handlePayment, price }) => {

    const history = useHistory()
    const [modal, setModal] = useState(false)

    const handleProceed = () => {
        setModal(!modal)
    }

    const amount = price
    const vendorId = localStorage.getItem("vendor-id");


    const variables = { amount, vendorId }

    const accessToken = localStorage.getItem("Access-Token");
    const refreshToken = localStorage.getItem("Refresh-Token");

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookies: `refreshToken=${refreshToken}`,
    };


    // CARD PAYMENT

    const handleCardPayment = (e) => {
        e.preventDefault()

        axios.post("https://chow.onrender.com/api/v1/paystack/card_payment", variables, { headers })
            .then(res => {
                console.log(res)

                localStorage.setItem("Refrence-code", res.data.data.ref.data.access_code)
                localStorage.setItem("Payment-url", res.data.data.ref.data.authorization_url)

                setModal(!modal)
            }).catch(e => {
                console.log(e)
            })
    }


    // WALLET PAYMENT

    const items = JSON.parse(localStorage.getItem("cartItems"))
    const orderTime = localStorage.getItem("Time")
    const packs = [
        {
            packType: localStorage.getItem("Pack"),
            amount: localStorage.getItem("Pack-Amount"),
            items: items
        }
    ]

    console.log(typeof items)
    const orderVariables = { vendorId, orderTime, packs }
    console.log(orderVariables)


    const handleWalletPayment = () => {
        axios.post("https://chow.onrender.com/api/v1/paystack/paywithWallet", variables, { headers })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: 'Payment Successfull...'
                });
                axios.post("https://chow.onrender.com/api/v1/orders", orderVariables, { headers })
                    .then(response => {
                        console.log(response)
                    }).catch(e => {
                        console.log(e)
                    })
                history.push("/dashboard")
            }).catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Insufficient fund'
                });
            })
    }


    return (
        <div>
            {/* <div className="cancel-icon"><MdOutlineCancel className='cancel' onClick={handlePayment} /></div> */}
            <div className="payment-container">
                <div className="cancel-icon"><MdOutlineCancel className='cancel' onClick={handlePayment} /></div>
                <h1 className="payment-method">Payment Method</h1>
                <p className="select-payment-method">Select one of the method of payment to complete shopping</p>
                <div className="payment-buttons">
                    <button className='card-btn' onClick={handleCardPayment}>Card</button>
                    <button className="wallet-btn" onClick={handleWalletPayment}>Wallet</button>
                </div>
                <div className="payment-buttons">
                    <button className="continue-btn">Continue</button>
                </div>
            </div>

            {/* Proceed Payment */}
            {modal && (
                <div className='center-proceed'>
                    <div className="is-proceed"></div>
                    <div className="center-content-proceed">
                        <ProceedPayment handlePayment={handleCardPayment} handleProceed={handleProceed} />
                    </div>

                </div>
            )}
        </div>
    )
}

export default Payment
