const express = require('express');

const connectDB = require('./DBconnection/connection');
const app = express();

app.use("/", require("./routes"))

connectDB();

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || port));
