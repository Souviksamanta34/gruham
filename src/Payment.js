import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    console.log("Payment");
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate()
    const b = 10;
    const stripe = useStripe();
    const elements = useElements();
    const [cardElementInteracted, setCardElementInteracted] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            if (getBasketTotal(basket) > 0) {
                const response = await axios.post('/createPayment', { total: getBasketTotal(basket) * 100 });
                setClientSecret(response.data.clientSecret);
            }
            
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const formattedTotal = getBasketTotal(basket).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const handleSubmit = async (event) => {
        console.log("Submit button clicked"); 
        // do all the fancy stripe stuff...
        event.preventDefault();
        console.log("Submit button clicked"); 

        if (!cardElementInteracted && !user) {
            alert("Please log in to proceed with the payment.");
            return; // Exit the function if the card details have not been entered
        }

        if (!cardElementInteracted) {
            alert("Please fill in your card details before placing the order.");
            return; // Exit the function if the card details have not been entered
        }
    
        if (!user) {
            alert("Please log in to proceed with the payment.");
            return; // Exit the function if the user is not logged in
        }

        if (getBasketTotal(basket) === 0) {
            alert("Your basket is empty. Please add items to the basket before proceeding to payment.");
            return; // Exit the function if the basket is empty
        }

        if (!clientSecret) {
            alert("Backend is not connected. Contact the developer.");
            return;
        }
        
        setProcessing(true);
    
        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
    
            // Check if the payment was successful
            if (payload.error) {
                // Handle the error here
                alert(`Payment failed: ${payload.error.message}`);
                setProcessing(false);
                return;
            }
    
            // paymentIntent = payment confirmation
            const paymentIntent = payload.paymentIntent;
    
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });
    
            setSucceeded(true);
            setError(null);
            setProcessing(false);
    
            dispatch({
                type: 'EMPTY_BASKET'
            });
    
            navigate("/orders", { replace: true }); // Navigate to a confirmation page
            alert("Your order is successful. Thank you for purchasing.");
        } catch (error) {
            // Catch any other errors
            alert(`An error occurred: ${error.message}`);
            setProcessing(false);
        }
    }
    

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
        // Only set cardElementInteracted to true if the user interacts with the card input
        if (!event.empty) {
            setCardElementInteracted(true);
        }
        // Debugging
        console.log("CardElement interacted:", cardElementInteracted);
    }

    useEffect(() => {
        console.log("CardElement interacted:", cardElementInteracted);
    }, [cardElementInteracted]);
    
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Your Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>{user?.address}</p>
                        <p>{user?.town}</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Your Items</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Pay Using Test Card</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <h3>Total Amount: {formattedTotal}</h3>
                                    <button disabled={processing || succeeded}>
                                        <span>{processing ? <p>Loading</p> : "Place Order Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;