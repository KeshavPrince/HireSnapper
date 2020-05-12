const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photographerSchema = new Schema({
    username : {
        type : String,
        unique : true,
        minlength : 3,
        trim : true,
        lowercase : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        trim : true,
        required : true
    },
    name : {
        type : String,  
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
        required : false,
    },
    bio : {
        type : String,
        maxlength : 50,
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
        required : false,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : false,
        minlength : 4,
        maxlength : 30,
    }
}, {
    timestamp : true,
});

photographerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

photographerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

photographer = mongoose.model('Photographer', photographerSchema);
module.exports = photographer;