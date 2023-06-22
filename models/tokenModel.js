const mongoose = require("mongoose")

const TokenSchema = mongoose.Schema({
    nombre: String,
    llave: String
})

const tokenModel = mongoose.model("token",TokenSchema)

module.exports = tokenModel
