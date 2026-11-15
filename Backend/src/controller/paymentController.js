// Create PaymentIntent API
// PaymentIntent Stripe ka object hai jo ek customer ki payment ko manage karta hai.Iski lifecycle hoti hai, jaise:
// - requires_payment_method
//     - requires_confirmation
//     - processing
//     - succeeded
//     - canceled

const stripe = require('../config/stripe')


const createPaymentIntent = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({

            amount: 5000,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        })
        res.status(200).json({
            success: true,
            // Ye frontend ko diya jata hai taake Stripe.js payment confirm kar sake.
            // Secret API key aur Client Secret different cheezein hain.API Secret Key sirf backend par rahegi.
            // Client Secret frontend ko diya ja sakta hai, lekin ise publicly expose ya logs mein print nahi karna chahiye.
            clientSecret: paymentIntent.client_secret,
            // Payment ko identify karna
            paymentIntentId: paymentIntent.id,

        })
    }
    catch (err) {
        console.error("Stripe Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Payment initialization failed",
        });

    }
}

module.exports = { createPaymentIntent }