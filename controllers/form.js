const User = require("../models/user");
const Barang = require("../models/barang");
const { errorHandling } = require("./errorHandling");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

exports.tambahBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { nama, jenis, jumlah, harga, supplier, catatan } = req.body;

    const barang = new Barang({
      namaBarang: nama,
      jenisBarang: jenis,
      jumlahBarang: jumlah,
      hargaBarang: harga,
      supplier: supplier,
      catatan: catatan,
    });

    await barang.save();

    res.status(201).redirect("/dashboard");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { nama, jenis, jumlah, harga, supplier, catatan } = req.body;
    const { id } = req.params;

    const newBarang = {
      namaBarang: nama,
      jenisBarang: jenis,
      jumlahBarang: jumlah,
      hargaBarang: harga,
      supplier: supplier,
      catatan: catatan,
    };

    await Barang.findByIdAndUpdate(id, newBarang);

    res.status(200).redirect("/dashboard");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        res.error('Error password not match');
      }

    const hashedPassword = await bcrypt.hash(password, 14)

    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    await User.findByIdAndUpdate(id, newUser);

    res.status(200).redirect("/dashboard");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { id } = req.params;

    await Barang.findByIdAndDelete(id);

    res.status(200).redirect("/dashboard");
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
