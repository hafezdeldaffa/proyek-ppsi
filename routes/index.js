var express = require("express");
const { isAuth } = require("../controllers/auth");
const {
  getEditBarang,
  getDashboard,
  getDetailBarang,
  getTambahBarang,
  getProfile,
} = require("../controllers/dashboard");
var router = express.Router();

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Login" });
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

/* GET dashboard page. */
router.get("/dashboard", isAuth, getDashboard);

/* GET edit page. */
router.get("/edit/:id", isAuth, getEditBarang);

/* GET tambah page. */
router.get("/tambah", isAuth, getTambahBarang);

/* GET detail page. */
router.get("/detail/:id", isAuth, getDetailBarang);

/* GET profile page. */
router.get("/profile", isAuth, getProfile);

module.exports = router;
