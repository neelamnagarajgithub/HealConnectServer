const express = require('express');
const StripeRouter=express.Router();
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



StripeRouter.post('/create-checkout-session', async (req, res) => {
  const line_items=req.body.nurse.map((item)=>{
    return {
        price_data:{
            currency:"inr",
            product_data:{
                name:nurse.name,
                id:nurse.id,
            },
            unit_amount:200*100 ,
        },
        quantity:1,
    }
})

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url:"https://heal-connect.vercel.app/user/payment/paymentsuccess",
    cancel_url: "https://heal-connect.vercel.app/user/filters", 
  });

  res.redirect(303, session.url);
});

module.exports=StripeRouter;