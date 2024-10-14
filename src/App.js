import React, { useEffect } from "react";
import ScrollToTop from './ScrollToTop'; 
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StateProvider } from './StateProvider'; 
import reducer, { initialState } from "./reducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import Home from "./Home";
import Payment from "./Payment";
import Footer from './Footer'; 
import About from "./About";
import Contact from './Contact';
import Orders from "./Orders";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register"; 
import Checkout from "./Checkout";
import Product from "./Product";
import "./App.css";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const stripePromise = loadStripe(
  "pk_test_51Q4NjxKvXJ3ZMUo0mWDCmgVqVc5sOALZoUL1kbHdvO956hsEC7BAPlRPQughDDbQV3y61cUNgkgiOY0rvzu0v1RP00S2arGwws"
);

const ParentComponent = () => (
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
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
      <ScrollToTop />
        <div className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} /> 
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/checkout" element={<Checkout   
 />} />
            <Route exact path="/product" element={<Product   
 />} />
            <Route exact path="/payment" element={<ParentComponent />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/orders" element={<Orders />} /> {/* Pass user as a prop */}
          </Routes>
          <Footer /> 
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
