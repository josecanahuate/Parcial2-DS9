/* const jwt = require('jsonwebtoken');

    const validarToken = (req, res, next) => {
      try {
        // Obtener el token de los headers de la solicitud
        const token = req.headers["authorization"].split(" ")[1];

        if (token==0) {
          return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
        }
    
        // Verificar el token
        jwt.verify(token, process.env.LOCALKEY, (error, data) => {
          if (error)
            return res.status(404).json({ error: 'Token de autenticación inválido' });
            console.log(data) 
          next();
        });
      } catch (error) {
        res.status(500).json({ error: 'Error al validar el token' });
      }
    };


module.exports = validarToken; */


const jwt = require('jsonwebtoken');
const _ = require('lodash');

const validarToken = (req, res, next) => {
  try {
    // Obtener el token de los headers de la solicitud
    const token = req.headers["authorization"].split(" ")[1];

    if (_.isEmpty(token)) {
      return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, process.env.LOCALKEY, (error, data) => {
      if (error) {
        return res.status(404).json({ error: 'Token de autenticación inválido' });
      }
      console.log(data);
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al validar el token' });
  }
};

module.exports = validarToken;
