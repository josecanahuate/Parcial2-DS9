const express = require('express');
const router = express.Router();
const axios = require('axios');
const validarToken = require('../middleware/validarToken');
const validarPrompt = require('../middleware/validarPrompt');
const ChatgptModel = require("../models/ChatgptModel")
const MongoConnect = require("../Mongo_Connect") // SE AGREGA MONGO
const mongoose = require('mongoose');

// Llamar a MongoConnect para establecer la conexión
MongoConnect();


router.post('/', (req, res) => {
    /* router.post('/',validarPrompt, validarToken, (req, res) => { */

    const message = req.body.name; // Obtener el mensaje enviado por el cliente en el cuerpo de la solicitud
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // URL de la API de OpenAI
    const apiKey = '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'; // Clave de API de OpenAI (reemplazada por la mia)

  // Configurar los parámetros de la solicitud a la API de OpenAI en formato JSON
  axios.post(apiUrl, {
      "model": "gpt-3.5-turbo", // Nombre del modelo pre-entrenado a utilizar
      "messages": [{ role: "system", "content": message }
      ],
      "temperature": 0.7, // Controla la aleatoriedad de la respuesta generada por el modelo de lenguaje
      "max_tokens": 512, // Controla el tamaño máximo de la respuesta generada por el modelo de lenguaje
      "top_p": 1, // Controla la generación de texto basada en la probabilidad de cada palabra
      "frequency_penalty": 0, // Controla la repetición de palabras en la respuesta generada por el modelo de lenguaje
      "presence_penalty": 0, // Controla la inclusión de palabras específicas en la respuesta generada por el modelo de lenguaje
  }, {
      headers: {
          'Content-Type': 'application/json', // Especifica que se está enviando JSON en el cuerpo de la solicitud
          'Authorization': `Bearer ${apiKey}` // Se envía la clave de API como un token de autorización en la cabecera de la solicitud
      }
  })
      .then(response => {
          // Extraer la respuesta generada por el modelo de lenguaje a partir de la propiedad 'choices' de la respuesta de la API
          const completion = response.data.choices[0].message.content;
          try{
              const {id_user} = req.body
              const gpt = new ChatgptModel ({ 
                  prompt:message,
                  response:completion,
                  id_user:id_user,
                  date_create: new Date()})
                  gpt.save()
              return res.json(gpt)
          }catch(error){
              res.status(404).send('Error de Peticion'); // Enviar una respuesta de error al cliente
          }
      })
      .catch(error => {
          console.log(error); // Manejar cualquier error que ocurra durante la solicitud a la API de OpenAI
          res.status(500).send('Ha ocurrido un error en la solicitud a la API de ChatGPT'); // Enviar una respuesta de error al cliente
      });
});

router.get("/:id", async(req, res)=>{
  try{
      const id = req.params.id
      const gpt= await ChatgptModel.findById(id)
      if(!gpt)
          return res.status(404).json({status:"No se encuentra el Registro"})
      return res.json(gpt)
      
  }catch(error){
      res.status(500).json({status:"Error de servidor"})
  }
})


router.get("/user/:id_user", async(req, res)=>{
  try {
      const userid = req.params.id_user;
      // Buscar todos los chats del usuario en la colección
      const registro = await ChatgptModel.find({ id_user: userid }); 

      return res.json(registro);

    } catch (error) {
      return res.status(500).json({ error: 'Error de servidor' });
    }
})


module.exports = router;
