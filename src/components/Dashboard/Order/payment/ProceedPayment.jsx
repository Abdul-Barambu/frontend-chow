import React from 'react'
import './ProceedPayment.css'
import { MdOutlineCancel } from 'react-icons/md'
import {useHistory} from 'react-router-dom'

const ProceedPayment = ({handleProceed}) => {

    const history = useHistory()

    const pay =   localStorage.getItem("Payment-url")

  return (
    <div>
      {/* <div className="cancel-icon"><MdOutlineCancel className='cancel' onClick={handlePayment} /></div> */}
      <div className="proceed-container">
            <div className="cancel-proceed-icon"><MdOutlineCancel className='cancel-proceed' onClick={handleProceed} /></div>
                <h1 className="payment-method">Payment</h1>
                <p className="select-payment-method">Are you sure you want to continue with payment via card?</p>
                <div className="payment-buttons">
                    <a href={`${pay}`} target='_blank' className="proceed-btn">Proceed</a>
                </div>
            </div>
    </div>
  )
}

export default ProceedPayment
