const User = require("../models/user");
const { check, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err.message,
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "USER email not found",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Invalid password",
      });
    }

    //create token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfull",
  });
};

//protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      err: "Unauthorized",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "You are not Admin, Access Denied",
    });
  }
  next();
};
