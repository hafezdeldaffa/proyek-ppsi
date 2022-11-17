const { validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { errorHandling } = require("./errorHandling");
const User = require("../models/user");

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    req.user = await User.findOne({ email: user.email });

    res.status(201).redirect("/");
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    const dataUser = await User.findOne({ email: email });

    if (!dataUser) {
      const error = new Error("Wrong data. Please check your login data!");
      error.statusCode = 401;
      throw error;
    }

    user = dataUser;
    const truePassword = await bcrypt.compare(password, user.password);

    if (!truePassword) {
      const error = new Error("Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    if (truePassword) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect("/dashboard");
      });
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/');
    });
  };
  
  exports.isAuth = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect('/');
    }
    next();
  };
  