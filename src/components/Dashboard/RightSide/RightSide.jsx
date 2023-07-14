import React from 'react'
import './RightSide.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const RightSide = () => {
  return (
    <div>
      <div className="container-right">
        <div className="cart-body">
          <AiOutlineShoppingCart className='cart' />
        </div>
      </div>
    </div>
  )
}

export default RightSide
