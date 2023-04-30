// const mongoose = require('mongoose');

// const uri = "mongodb+srv://cse341projects:hove101cse341@cluster0.xptqsz6.mongodb.net/?retryWrites=true&w=majority";

// const connectDB = async () => {
//     await mongoose.connect(uri);
//     console.log('DB Connected!');
// }

// module.exports = connectDB;

// LESSON 2 ASSIGNMENT

const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};