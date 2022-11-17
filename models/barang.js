const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const barangSchema = new Schema(
  {
    namaBarang: {
      type: String,
      required: true,
    },
    jenisBarang: {
      type: String,
      required: true,
    },
    jumlahBarang: {
      type: Number,
      required: true,
    },
    hargaBarang: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
    },
    catatan: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Barang", barangSchema);
