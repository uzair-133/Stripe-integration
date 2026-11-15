const express = require('express')
const app = express();
const cors = require('cors');
const paymentRoutes = require('../src/routes/paymentRoutes')

app.use(cors());
app.use(express.json())

app.use('/api/payment', paymentRoutes)


module.exports = app;