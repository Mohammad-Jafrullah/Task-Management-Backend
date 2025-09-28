const mongoose = require('mongoose');
require('dotenv').config();
const MongoURI = process.env.MONGO_URI;

const db = () => {
    mongoose.connect(MongoURI)
        .then(() => console.log('Database Connected Successfully!'));
}

module.exports = db;