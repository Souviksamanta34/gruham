import React from "react";
import { useDispatch } from "react-redux";
import { useStateValue } from "./StateProvider";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Home from "./Home";
import Payment from "./Payment";
import Orders from "./Orders";
import Header from "./Header";
import Login from "./Login";
import { auth } from "./firebase";
import Checkout from "./Checkout";
import Product from "./Product";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutProduct from "./CheckoutProduct";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

function App() {
  const [{}, dispatch] = useStateValue();


  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });
  }, []);

  return (
    
    <Router>
    <div className="app">
        <Routes>
          <Route exact path="/" element={[<Header/>,<Home/>]}/> 
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/checkout" element={[<Header/>,<Checkout />]} />
          <Route exact path="/product" element={[<Header/>,<Product />]} />
          <Route exact path="/payment" element={[<Header/>,<Payment/>]} />
          <Route exact path="/orders" element={[<Header/>,<Orders />]} />
          <Route exact path="/checkoutproduct" element={[<Header/>,<CheckoutProduct />]} />
        </Routes>
    </div>
    </Router>
    
  );

  
}





export default App;