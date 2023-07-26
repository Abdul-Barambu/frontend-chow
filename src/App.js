import React from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import ForgotPassword from './components/Forgot-Password/ForgotPassword';
import ResetPassword from './components/Reset-Password/ResetPassword';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Order from './components/Dashboard/Order/Order';
import MainCart from './components/Dashboard/Order/MainFood/MainCart';
import Profile from './components/Dashboard/profile/Profile';
import ProceedPayment from './components/Dashboard/Order/payment/ProceedPayment';
import Budget from './components/Dashboard/budget/Budget';
import Success from './components/Dashboard/success/Success';
import VendorDashboard from './components/Vendor Side/vendor dashboard/VendorDashboard';
import VendorOrder from './components/Vendor Side/vendor-orders/VendorOrder';
import VendorMenu from './components/Vendor Side/vendor menu/VendorMenu';
import VendorMenuDrinks from './components/Vendor Side/vendor menu/VendorMenuDrinks';
import VendorMenuSpecials from './components/Vendor Side/vendor menu/VendorSpecials';
import VendorProfile from './components/Vendor Side/vendor profile/VendorProfile';

function App() {

  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/proceed-payment" component={ProceedPayment} />
        <Route path="/budget" component={Budget} />
        <Route path="/success" component={Success} />
        <Route path="/main-cart" component={MainCart} />
        <Route path="/vendor-dashboard" component={VendorDashboard} />
        <Route path="/vendor-order" component={VendorOrder} />
        <Route path="/vendor-menu" component={VendorMenu} />
        <Route path="/vendor-drink" component={VendorMenuDrinks} />
        <Route path="/vendor-special" component={VendorMenuSpecials} />
        <Route path="/vendor-profile" component={VendorProfile} />
        <Route path="/order" component={Order} /><Order />
      </Switch>

    </div>
  );
}

export default App;
