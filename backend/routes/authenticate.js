const user = require('../models/photographer.model');

module.exports = (app) => {
    
    if(req.body.name == null) {
        res.send({
            success : !true,
            message : 'name is required'
        });
    }
    if(req.body.email == null) {
        res.send({
            success : !true,
            message : 'email is required'
        });
    }
    if(req.body.password == null) {
        res.send({
            success : !true,
            message : 'password is required'
        });
    }

    user.find({
        email : req.body.email.toLowerCase()
    }, (err, user) => {
        if(err) {
            res.send({
                success : !true,
                message : 'Server error..'
            });
        }
        else if(user.length > 0) {
            res.send({
                success : !true,
                message : 'Email already have account'
            });
        }
    });
    var newUser = new user();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.password = newUser.genrateHash(req.body.password);
    newUser.save((err, userCreated) => {
        if(err) {
            res.send({
                success : !true,
                message : 'Server error..'
            });
        }
        else {
            res.send({
                success : true,
                message : 'Account Created..'
            });
        }
    } );
}