const mongoose = require('mongoose')
const config = require('./index')

exports.connect = () => {
    mongoose.connect(config.MONGODB_URI,)
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((error) => {
        console.log('Error connected to database');
        console.error(error)
        process.exit(1)
    })
}