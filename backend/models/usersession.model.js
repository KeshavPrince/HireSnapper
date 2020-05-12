const mongoose = require('mongoose');

const userSessionSehema = mongoose.Schema({
    userSessionId : {
        type : Number
    },
} , {
    timestamps : true,
});

module.exports = mongoose.model('UserSession', userSessionSehema);