// LESSON 1
// const routes = require("express").Router();

// const lesson1Controller = require("../controllers/lesson_1");

// routes.get('/', lesson1Controller.traceyRoute);
// routes.get('/jordan', lesson1Controller.jordanRoute);
// routes.get('/jared', lesson1Controller.jaredRoute);
// routes.get('/taylor', lesson1Controller.taylorRoute);

// module.exports = routes;

// LESSON 2
const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))

module.exports = router;