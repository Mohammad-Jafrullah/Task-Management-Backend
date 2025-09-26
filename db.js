const mongoose = require('mongoose');
const MongoURI = process.env.MONGO_URI;

const db = () => {
    mongoose.connect(MongoURI)
        .then(() => console.log('Database Connected Successfully!'));
}

module.exports = db; 