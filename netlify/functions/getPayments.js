const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict it to 'http://localhost:3000' or your frontend domain
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
  });
  
app.get('/.netlify/functions/getPayments', (req, res) => {
  res.status(200).json({ message: 'Payment data fetched successfully' });
});

module.exports.handler = serverless(app);
