const mongoose = require('mongoose');
const db = 'mongodb+srv://MaxCoder:max123@cluster0.tq70e.mongodb.net/test';

const connectDb = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');

    }catch(err) {
        console.error(err);
        process.env(1)
    }
}

module.exports = connectDb;