const Stripe = require('stripe')


//Stripe SDK initialize s
const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
)

module.exports = stripe