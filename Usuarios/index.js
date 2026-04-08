const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://mongodb:27017/usuarios_db')
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err));


const Usuario = mongoose.model('Usuario', {
  nombre: String,
  correo: String
});


app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json(usuario);
});

app.listen(3001, () => console.log('Usuarios en 3001'));