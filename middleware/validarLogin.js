const validarLogin = (req, res, next) => {
  try {
    const {user,password} = req.body;

    // Validar que se proporcionen el usuario, la contraseña y el nombre
    if (!user || !password) {
      return res.status(400).json({ error: 'Datos de inicio de sesión incompletos' });
    }

    // Validar la longitud del usuario y la contraseña
    if (user.length < 4 || user.length > 20 || password.length < 6 || password.length > 20) {
      return res.status(400).json({ error: 'Longitud inválida para el usuario o la contraseña' });
    }

    // Asignar el campo date_create
    req.body.date_create = new Date();

    next(); // Llamar a next() para pasar al siguiente middleware
  } catch (error) {
    res.status(500).json({ error: 'Error al validar el inicio de sesión' });
  }
};

module.exports = validarLogin;
