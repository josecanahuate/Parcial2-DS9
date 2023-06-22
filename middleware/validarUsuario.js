const validarUsuario = (req, res, next) => {
  try {
    const { user, password, name } = req.body;

   // Verificar que se proporcionen todos los campos obligatorios
   if (!user || !password || !name) {
    console.log(error)
    return res.status(400).json({ error: 'Datos de usuario incompletos' });
  }

    next(); // Llamar a next() para pasar al siguiente middleware
  } catch (error) {
    res.status(500).json({ error: 'Error al validar los datos del usuario' });
  }
};


module.exports = validarUsuario;
