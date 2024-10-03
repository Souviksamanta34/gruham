const express = require('express');
const stripe = require('stripe')('sk_test_51Q4NjxKvXJ3ZMUo0pjOYVMKF0vTXeiNIITa3miekoLowaee6Hn9c6gQGeuqjDjKTG0W08tCyNQ5tUIbbKW8koqTE006q82nYHw');
const serverless = require('serverless-http');
const app = express();

// Use express.json() to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict it to 'http://localhost:3000' or your frontend domain
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
  });

app.post('/.netlify/functions/createPayment', async (req, res) => {
  try {
    // Ensure total is sent in the request body
    const { total } = req.body;
    if (!total) {
      throw new Error('Total is missing in the request body');
    }

    // Create the payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Amount should be in cents
      currency: 'usd',
    });

    // Return the client secret to the client
    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).send({ error: 'Unable to create payment intent', details: error.message });
  }
});

module.exports.handler = serverless(app);
