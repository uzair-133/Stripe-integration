const mongoose = require('mongoose')


const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb is connected")
    }
    catch (err) {
        console.log("Mongodb is Not Connected", err.message)
    }
}
module.exports = connectToDb;