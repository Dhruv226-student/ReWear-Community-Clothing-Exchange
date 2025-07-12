const mongoose = require('mongoose');
const config = require('../config/config');
const { successColor, errorColor } = require('../helper/color.helper');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoose.url, {
            useNewUrlParser: true,
            autoIndex: true,
            useUnifiedTopology: true,
        });
        console.log(successColor, '✅ Database Connected successfully...');
    } catch (error) {
        console.log(errorColor, '❌ Database Connections Error:', error);
    }
};

module.exports = connectDB;
