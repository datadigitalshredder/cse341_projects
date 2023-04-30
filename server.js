// LESSON 1
// const express = require('express');

// const connectDB = require('./DBconnection/connection');
// const app = express();

// app.use("/", require("./routes"))

// connectDB();

// const port = 3000;

// app.listen(process.env.port || port);
// console.log('Web Server is listening at port '+ (process.env.port || port));

// LESSON 2
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./DBconnection/connection');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});
