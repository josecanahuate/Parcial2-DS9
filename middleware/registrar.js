const fs = require('fs');

const registrar = (req, res, next) => {
  try {
    const { rawHeaders } = req;

    // Obtener la hora actual
    const currentDate = new Date().toISOString();

    // Crear el mensaje a escribir en el archivo access.log
    const logMessage = `${currentDate} - ${rawHeaders.join('Se registra la entrada ')}\n`;

    // Escribir en el archivo access.log utilizando el método appendFileSync
    fs.appendFileSync('access.log', logMessage);

    next();
  } catch (error) {
    console.error('Error al escribir en access.log ', error);
  }
};

module.exports = registrar;
