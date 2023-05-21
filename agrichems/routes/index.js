const express = require('express');
const router = express.Router();

router.use('/agrichems', require('./agrichems'))

module.exports = router;