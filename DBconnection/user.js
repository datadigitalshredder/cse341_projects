const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

module.exports = user = mongoose.model('user', user);