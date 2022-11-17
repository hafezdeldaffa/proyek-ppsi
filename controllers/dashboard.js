const Barang = require("../models/barang");
const { errorHandling } = require("./errorHandling");
const { validationResult } = require("express-validator");

async function getData() {
  const barang = await Barang.find({});
  const barangKurangStock = await Barang.find({ jumlahBarang: { $lt: 4 } });
  const length = barangKurangStock.length;

  return {
    barang,
    barangKurangStock,
    length,
  };
}

async function getDataById(id) {
  const barang = await Barang.findById(id);
  const barangKurangStock = await Barang.find({ jumlahBarang: { $lt: 4 } });
  const length = barangKurangStock.length;

  return {
    barang,
    barangKurangStock,
    length,
  };
}

async function getDataBarangKurangStock() {
  const barangKurangStock = await Barang.find({ jumlahBarang: { $lt: 4 } });
  const length = barangKurangStock.length;

  return {
    barangKurangStock,
    length,
  };
}

exports.getDashboard = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { barang, barangKurangStock, length } = await getData();

    res.render("dashboard", {
      title: "Dashboard Kedai Mpok Nur",
      barang,
      barangKurangStock,
      alertCount: length,
      user: req.session.user,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getEditBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { id } = req.params;

    const { barang, barangKurangStock, length } = await getDataById(id);

    res.render("edit", {
      title: "Edit Barang",
      barang,
      barangKurangStock,
      alertCount: barangKurangStock.length,
      user: req.session.user,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getTambahBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { barang, barangKurangStock, length } =
      await getDataBarangKurangStock();

    res.render("tambah", {
      title: "Tambah Barang",
      barang,
      barangKurangStock,
      alertCount: length,
      user: req.session.user,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getDetailBarang = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { id } = req.params;

    const { barang, barangKurangStock, length } = await getDataById(id);

    res.render("detail", {
      title: "Detail Barang",
      barang,
      barangKurangStock,
      alertCount: barangKurangStock.length,
      user: req.session.user,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const { barang, barangKurangStock, length } =
      await getDataBarangKurangStock();

    res.render("profile", {
      title: "Tambah Barang",
      barang,
      barangKurangStock,
      alertCount: length,
      user: req.session.user,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
