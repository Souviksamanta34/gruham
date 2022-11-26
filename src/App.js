import React from "react";
import { useDispatch } from "react-redux";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutProduct from "./CheckoutProduct";
import { Elements } from "@stripe/react-stripe-js";
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


const stripePromise = loadStripe(
  "pk_test_51M8PmaSBfDgVVAc0emLZJXMQeroklvsmQW8MMy8942wEyZaBZpzd9rht59eesmjXFgcH43PzkJDXYTPE66O3gBKx00wiASjXCV"
);

const ParentComponent= () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
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
          <Route exact path="/payment" element={[<Header/>,ParentComponent()]} />      
          <Route exact path="/orders" element={[<Header/>,<Orders />]} />        
        </Routes>
    </div>
    </Router>
    
  );

  
}





export default App;