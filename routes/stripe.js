var express = require('express');
var router = express.Router();

const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);


router.post("/create-payment-intent", cors(), async (req, res) => {
    const { price } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: "eur",
        }); 
        console.log('client secret payment intent => ', typeof paymentIntent.client_secret)      
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.json({
            success: false
        })
    } 
  });

module.exports = router;