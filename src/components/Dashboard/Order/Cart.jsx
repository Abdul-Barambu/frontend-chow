import React from 'react'
import { useEffect } from 'react'

const Cart = () => {

    const pay = localStorage.getItem("Payment-url")

    // useEffect(() => {
    //     localStorage.getItem("Payment-url")
    // })
  return (
    <div>
      <a href={`${pay}`} target='_blank'>PAY</a>
    </div>
  )
}

export default Cart
