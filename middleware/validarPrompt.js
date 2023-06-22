const validarPrompt = (req, res, next) => {
  try {
    const { name, id_user } = req.body;

    if(name=="")
        return res.status(400).json({status:"El campo Nombre no puede estar Vacio"})

    if(id_user=="")
        return res.status(400).json({status:"Ingrese su ID de Usuario"})

    next(); // Llamar a next() para pasar al siguiente middleware

  } catch (error) {
    res.status(500).json({ error: 'Error al validar el prompt' });
  }
};

module.exports = validarPrompt;
