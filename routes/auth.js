const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const { register, login, logout } = require("../controllers/auth");
const User = require("../models/user");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please add a valid email")
      .custom(async (value) => {
        return await User.findOne({ email: value }).then((user) => {
          if (user) {
            return new Promise.reject(
              "E-Mail already used, please use another email!"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("confirm_password")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          const err = new Error(
            "Password minimum 8 characters long!"
          );
          throw err;
        }

        // Indicates the success of this synchronous custom validator
        return true;
      }),
  ],
  register
);

router.post("/dashboard", login);

router.get("/logout", logout);

module.exports = router;
