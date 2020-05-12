const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const photographerSchema = new Schema({
    email : {
        type : String,
        unique : true,
        trim : true,
        default : '',
        required : true
    },
    name : {
        type : String,
        default : '',  
        required : true,
        trim : true,
    },
    skills : {
        type : [String],
        required : false,
    },
    portfolioPics : {
        type : [String],
        required : false,
    },
    profilePic : {
        type : String,
        default : '',
        required : false,
    },
    bio : {
        type : String,
        default : '',
        trim : true,
    },
    clientExperience : {
        type : [ { clientName : { 
            type : String,
            required : true,
            trim : true, 
        },
        clientMessage : {
            type : String,
            required : true,
            trim : true,
        }
        }],
        required : false,
    },
    rating : {
        type : Number,
        default : -1,
        required : false,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : false,
    }
}, {
    timestamp : true,
});

photographerSchema.methods.genrateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

photographerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

photographer = mongoose.model('Photographer', photographerSchema);
module.exports = photographer;