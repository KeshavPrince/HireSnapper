const user = require("../models/photographer.model");
const userSession = require("../models/usersession.model");

module.exports = (app) => {
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
    return false;
  }
  app.post("/authenticate/signup", (req, res, next) => {
    if (req.body.name == null || req.body.name == "") {
      res.send({
        success: !true,
        message: "name is required",
      });
    } else if (req.body.email == null || req.body.email == "") {
      res.send({
        success: !true,
        message: "email is required",
      });
    } else if (ValidateEmail(req.body.email) == false) {
      res.send({
        success: !true,
        message: "Email is Invalid",
      });
    } else if (req.body.password == null || req.body.password == "") {
      res.send({
        success: !true,
        message: "password is required",
      });
    } else {
      user.find(
        {
          email: req.body.email.toLowerCase(),
        },
        (err, foundUser) => {
          if (err) {
            res.send({
              success: !true,
              message: "Server error..",
            });
          } else if (foundUser.length > 0) {
            res.send({
              success: !true,
              message: "Email already have account",
            });
          } else {
            var newUser = new user();
            newUser.email = req.body.email.toLowerCase();
            newUser.name = req.body.name;
            newUser.password = newUser.genrateHash(req.body.password);
            newUser.save((err, userCreated) => {
              if (err) {
                res.send({
                  success: !true,
                  message: "Server error..",
                });
              } else {
                res.send({
                  success: true,
                  message: "Account Created..",
                });
              }
            });
          }
        }
      );
    }
  });

  app.get("/authenticate/signin", (req, res) => {
    if (req.body.email == null || req.body.email == "") {
      res.send({
        success: !true,
        message: "email is required",
      });
    } else if (ValidateEmail(req.body.email) == false) {
      res.send({
        success: !true,
        message: "Email is Invalid",
      });
    } else if (req.body.password == null || req.body.password == "") {
      res.send({
        success: !true,
        message: "password is required",
      });
    } else {
      user.find(
        {
          email: req.body.email.toLowerCase(),
        },
        (err, foundUsers) => {
          if (err) {
            res.send({
              success: false,
              message: "Server error..",
            });
          } else if (foundUsers.length == 0) {
            res.send({
              success: false,
              message: "No Such User Exists",
            });
          } else if (!foundUsers[0].validPassword(req.body.password)) {
            res.send({
              success: false,
              message: "Wrong Credentials..",
            });
          } else {
            userSession.find(
              {
                userSessionId: foundUsers[0]._id,
              },
              (err, result) => {
                if (err) {
                  res.send({
                    success: false,
                    message: "Server error..",
                  });
                } else if (result.length > 0) {
                  res.send({
                    success: false,
                    message: "Already Loged in",
                  });
                } else {
                  var newUserSession = new userSession();
                  newUserSession.userSessionId = foundUsers[0]._id;
                  newUserSession.save((errr, docs) => {
                    if (errr) {
                      res.send({
                        success: false,
                        message: "Server error..",
                      });
                    }
                    res.send({
                      success: true,
                      message: "Loged In..",
                      token: docs._id,
                    });
                  });
                }
              }
            );
          }
        }
      );
    }
  });

  app.delete("/authenticate/signout", (req, res) => {
    userSession.findByIdAndDelete(
      {
        _id: req.body._id,
      },
      (err, result) => {
        if (err) {
          res.send({
            success: false,
            message: "Server error..",
          });
        } else if (result == null) {
          res.send({
            success: false,
            message: "Not Signed In",
          });
        } else {
          res.send({
            success: true,
            message: "SignOut..",
          });
        }
      }
    );
  });
};
