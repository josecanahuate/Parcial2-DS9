const express = require("express")
const router = express.Router()
const tokenModel = require("../models/tokenModel")
const jwt = require("jsonwebtoken") // token web json 
const validarToken = require("../middleware/validarToken");

const MongoConnect = require("../Mongo_Connect") // se agrega Mongo

MongoConnect() // se hace la conexion a Mongo

router.post("/create", async (req, res) => {
    try {
        const { nombre, llave } = req.body
        const tokenuser = new tokenModel({ nombre, llave });
        await tokenuser.save();
        return res.json(tokenuser)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Error de servidor1" })
    }
})


router.post("/validate", async (req, res) => {
    try {
        const { llave } = req.body
        const tokenuser = await tokenModel.find({ llave })

        if (tokenuser.length == 0)
            return res.status(404).json({ status: "llave no encontrada" })
        /* return res.json(token) */

        //SE GENERA EL TOKEN + VALIDACIONES
        jwt.sign({ tokenuser }, process.env.LOCALKEY, (error, token) => {
            /* jwt.sign({ tokenuser }, process.env.LOCALKEY, { expiresIn: "5h" }, (error, token) => { */
            //s(segundos), m(minutos), h(hora), day/d(dias) 
            if (error)
                return res.status(500).json({ status: "Token no generado" })
            return res.json({ token });
        });
    } catch (error) {
        return res.status(500).json({ status: "Error de servidor" })
    }
})


module.exports = router