const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validarLogin = require('../middleware/validarLogin');
const validarUsuario = require('../middleware/validarUsuario');
const validarToken = require('../middleware/validarToken');

const MongoConnect = require("../Mongo_Connect") // SE AGREGA MONGO
// Llamar a MongoConnect para establecer la conexión
MongoConnect();



// Ruta para obtener todos los usuarios
router.get('/', validarToken, async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await UserModel.find();
    return res.json(users);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});



// Ruta para obtener un usuario específico
router.get('/:id', validarToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el usuario en la base de datos por su ID
    const usuario = await UserModel.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});



// Ruta para registrar un usuario
router.post('/', validarUsuario, validarToken, async (req, res) => {
  try {
    const { user, password, name } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuario = await UserModel.findOne({ user });
    if (usuario) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    // Generar el salt y cifrar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear el nuevo usuario
    const newUser = new UserModel({
      user,
      salt: salt,
      password: hashedPassword,
      name,
      date_create: new Date()
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    /*    return res.json(newUser); */

    res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

router.post('/login', validarLogin, async (req, res) => {
        try {
          const { user, password } = req.body;

          const usuario = await UserModel.findOne({ user });

          if (!usuario) {
            return res.status(404).json({ status: 'Usuario Inválido' });
          }

          try {
            const validsalt = await usuario.salt;
            const hash = bcrypt.hashSync(password, validsalt);
            const validpass = await usuario.password;

            if (hash === validpass) {
              // Login Validado - Debe enviar el token de autenticación aquí
              return res.json(usuario);
            } else {
              return res.json('Contraseña Incorrecta');
            }
          } catch (error) {
            return res
              .status(500)
              .json({ status: 'Credenciales Inválidas.', error: error.message });
          }
        } catch (error) {
          return res.status(500).json({ status: 'Error de servidor', error: error.message  });
        }
      }); 


    /* // Ruta para iniciar sesión
    router.post('/login', validarLogin, async (req, res) => {
      try {
        const { user, password } = req.body;

        // Verificar si el usuario existe en la base de datos
        const usuario = await UserModel.findOne({ user });

        if (!usuario) {
          return res.status(401).json({ status: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const validarContrasena = bcrypt.compareSync(password, usuario.password);
        if (!validarContrasena) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Resto de la lógica para generar el token de autenticación, si es necesario

      } catch (error) {
        return res.status(500).json({ error: 'Error de Servidor' });
      }
    }); */




// Ruta para actualizar un usuario
router.put('/:id', validarToken, validarUsuario, async (req, res) => {
  try {
    const { id } = req.params;
    const { user, password, name } = req.body;

    // Verificar si el usuario existe en la base de datos
    const usuario = await UserModel.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si se proporcionó una nueva contraseña
    if (password) {
      // Generar el salt y cifrar la nueva contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Actualizar los datos del usuario
      usuario.user = user;
      usuario.name = name;
      usuario.salt = salt;
      usuario.password = hashedPassword;
    } else {
      // Si no se proporcionó una nueva contraseña, solo actualizar los otros datos
      usuario.user = user;
      usuario.name = name;
    }

    // Guardar los cambios en la base de datos
    await usuario.save();
    
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
    console.log(error);
  }
});



// Ruta para eliminar un usuario
router.delete('/:id', validarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findByIdAndDelete(id);

    // Verificar si el usuario existe en la base de datos
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
    console.log(error)
  }
});


module.exports = router;
