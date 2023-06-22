require("dotenv").config();
const express = require("express");
const app = express();
require('dotenv').config();

const mongoose = require("mongoose");

const rutaUsuarios = require("./routes/rutaUsuarios");
const rutachatGpt = require("./routes/rutachatGpt"); 
const rutaToken = require('./routes/tokenRoute');
const registrar = require('./middleware/registrar');
app.use(express.json());

// Rutas relacionadas con el registro
app.use(registrar)

// Ruta relacionada con ChatGPT
app.use("/user", rutaUsuarios);

// Rutas relacionada con el tokenn
app.use("/token", rutaToken);

// Rutas relacionadas con los usuarios
app.use("/chatgpt", rutachatGpt);


// Conexión a la base de datos
  app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando en el puerto 3000");
  });

/* mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    // Iniciar el servidor
    app.listen(3000, () => {
      console.log("Servidor escuchando en el puerto 3000");
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  }); */
