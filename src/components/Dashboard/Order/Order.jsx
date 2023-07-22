import React, { useState, useEffect } from 'react'
import MainFood from './MainFood/MainFood'
import Drinks from './Drinks/Drinks'
import './Order.css'
import Cart from './Cart'
import MainCart from './MainFood/MainCart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import EmptyCart from '../Cart/EmptyCart'
import Specials from './Specials/Specials'
import NavBar from './nav/NavBar';



const Order = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const history = useHistory()
  // const [empty, setEmpty] = useState(false)


  const handleClick = (item) => {

    let isPresent = false;
    cart.forEach((product) => {
      if (item._id === product._id)
        isPresent = true;
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false)
      }, 3000);

      return;
    }

    setCart([...cart, item])
  }

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data._id === item._id)
        ind = index;
    });

    const temArr = cart;
    temArr[ind].amount += d

    if (temArr[ind].amount === 0)
      temArr[ind].amount = 1
    setCart([...temArr])
  }



  return (
    <div>

{/* TODO: cart.length  */}
      {
        show ? <NavBar size={cart.length} handleClick={handleClick} setShow={setShow} handleChange={handleChange} />
          : <MainCart size={cart.length} cart={cart} setCart={setCart} handleChange={handleChange} />
      }

      <Switch>
        {
          show ? <Route path='/order-main' exact><MainFood size={cart.length} handleClick={handleClick} setShow={setShow} /></Route>
            : <Route path='' exact></Route>
        }

        {
          show ? <Route path='/order-drinks' exact><Drinks size={cart.length} handleClick={handleClick} setShow={setShow} /></Route>
            : <Route path='' exact></Route>
        }

        {
          show ? <Route path='/order-specials' exact><Specials size={cart.length} handleClick={handleClick} setShow={setShow} /></Route>
            : <Route path='' exact></Route>
        }
      </Switch>

      {
        warning && <div className='warning'>Food already added to cart</div>
      }

    </div>
  )
}

export default Order