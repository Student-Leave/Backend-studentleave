const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_DEPLOY)

        console.log('Connect DB Success')
    } catch (err) {
        console.log(err)
        console.log('Connect DB Faillllllllllll')
        process.exit(1)
    }
}

module.exports = connectDB;