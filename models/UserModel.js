const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
});

//usuario -> Nombre de la Tabla, no tiene modificacion en nada
const UserModel = mongoose.model("usuario", userSchema);
module.exports = UserModel



