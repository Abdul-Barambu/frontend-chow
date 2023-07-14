import React from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import ForgotPassword from './components/Forgot-Password/ForgotPassword';
import ResetPassword from './components/Reset-Password/ResetPassword';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Order from './components/Dashboard/Order/Order';
import MainFood from './components/Dashboard/Order/MainFood/MainFood';
import Drinks from './components/Dashboard/Order/Drinks/Drinks';
import Specials from './components/Dashboard/Order/Specials/Specials';
import MainCart from './components/Dashboard/Order/MainFood/MainCart';
import EmptyCart from './components/Dashboard/Cart/EmptyCart';
import Payment from './components/Dashboard/Order/payment/Payment';
import Profile from './components/Dashboard/profile/Profile';
import Cart from './components/Dashboard/Order/Cart';
import ProceedPayment from './components/Dashboard/Order/payment/ProceedPayment';
import Budget from './components/Dashboard/budget/Budget';
import Success from './components/Dashboard/success/Success';

function App() {

  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile"><Profile name='isa' /></Route>
        <Route path="/proceed-payment" component={ProceedPayment} />
        <Route path="/budget" component={Budget} />
        <Route path="/success" component={Success} />
        <Route path="/order" component={Order} /><Order />
      </Switch>
    </div>
  );
}

export default App;
