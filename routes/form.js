var express = require("express");
const { isAuth } = require("../controllers/auth");
const { body } = require("express-validator");
const {
  tambahBarang,
  editBarang,
  deleteBarang,
  editProfile,
} = require("../controllers/form");
var router = express.Router();

router.post("/tambah", isAuth, tambahBarang);
router.post("/edit/:id", isAuth, editBarang);
router.post(
  "/profile/:id",
  [
    body("password").trim().isLength({ min: 8 }),
    body("confirm_password")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password minimum 8 characters long!");
        }

        // Indicates the success of this synchronous custom validator
        return true;
      }),
  ],
  isAuth,
  editProfile
);
router.get("/delete/:id", isAuth, deleteBarang);

module.exports = router;
