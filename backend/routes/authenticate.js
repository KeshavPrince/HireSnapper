const user = require('../models/photographer.model');
const userSession = require('../models/usersession.model');

module.exports = (app) => {
    
    app.post('/authenticate/signup', (req, res, next) => {
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
        }, (err, foundUser) => {
            if(err) {
                res.send({
                    success : !true,
                    message : 'Server error..'
                });
            }
            else if(foundUser.length > 0) {
                res.send({
                    success : !true,
                    message : 'Email already have account'
                });
            }
            else 
            {
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
                });
            }
        });       
    });

    app.get('/authenticate/signin', (req, res) => {
        
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
        }, (err, foundUsers) => {
            if(err) {
                res.send({
                    success : false,
                    message : 'Server error..'
                });
            }
            if(foundUsers.length == 0) {
                res.send({
                    success : false,
                    message : 'Server error..'
                });
            }
            if(!foundUsers[0].validPassword(req.body.password)) {
                res.send({
                    success : false,
                    message : 'Wrong Credentials..'
                });
            }
            var newUserSession = new userSession();
            newUserSession.userSessionId = foundUsers[0]._id;
            newUserSession.save((errr, docs) => {
                if(errr) {
                    res.send({
                        success : false,
                        message : 'Server error..'
                    });
                }
                res.send({
                    success : true,
                    message : 'Loged In..',
                    token : docs._id
                });
            });
        })
    });

    app.delete('/authenticate/signout', (req, res) => {
        userSession.deleteMany({
            _id : req.body._id
        }, (err, result) => {
            if(err) {
                res.send({
                    success : false,
                    message : 'Server error..'
                });
            }
            else if(result.length == 0) {
                res.send({
                    success : false,
                    message : 'Not Signed In'
                });
            }
            else {
                res.send({
                    success : true,
                    message : 'SignOut..'
                });
            }
        });
    });
}