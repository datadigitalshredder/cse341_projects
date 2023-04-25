const mongoose = require('mongoose');

const uri = "mongodb+srv://cse341projects:hove101cse341@cluster0.xptqsz6.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(uri);
    console.log('DB Connected!');
}

module.exports = connectDB;