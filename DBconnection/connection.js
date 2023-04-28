// const mongoose = require('mongoose');

// const uri = "mongodb+srv://cse341projects:hove101cse341@cluster0.xptqsz6.mongodb.net/?retryWrites=true&w=majority";

// const connectDB = async () => {
//     await mongoose.connect(uri);
//     console.log('DB Connected!');
// }

// module.exports = connectDB;

// CONNECT TO MONGODB - TEAM SOLUTION

const {MongoClient} = require('mongodb');

const conncetDB = async () => {
    try {
        const client = await MongoClient.conncetDB(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(process.env.DB_NAME);
        const contactsCollection = db.collection(process.env.DB_COLLECTION_NAME);
        console.log('MongoDB Connected!');
        return contactsCollection;
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

module.exports = { conncetDB };

