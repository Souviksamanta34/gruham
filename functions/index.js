const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q4NjxKvXJ3ZMUo0pjOYVMKF0vTXeiNIITa3miekoLowaee6Hn9c6gQGeuqjDjKTG0W08tCyNQ5tUIbbKW8koqTE006q82nYHw");
//API

//app config
const app = express();

//middleware
app.use(cors({origin: true}));
app.use(express.json());

//api routes
app.get('/', (req, res) => res.status(200).send('hello world')); 

app.post('/payments/create', async (req, res) => {
    try {
        const total = req.query.total;
        logger.info("Payment Request Received for this amount >>> ", total);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, //subunits of the currency
            currency: "usd",
        });

        // Respond with the client secret
        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        logger.error("Error creating payment intent: ", error);
        res.status(500).send({
            error: 'Unable to create payment intent',
        });
    }
});


//listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://127.0.0.1:5001/gruham-eb94a/us-central1/api