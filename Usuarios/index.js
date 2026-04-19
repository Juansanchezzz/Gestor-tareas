const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = 'gtu_secret_2024';

// Conexión MongoDB
mongoose.connect('mongodb://mongodb:27017/usuarios_db')
  .then(() => console.log('✅ Mongo conectado'))
  .catch(err => console.log('❌ Error Mongo:', err));

// Modelo con password
const Usuario = mongoose.model('Usuario', {
  nombre:   String,
  correo:   String,
  password: String
});

// ── REGISTRO ──────────────────────────────────────────
app.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password)
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });

    const existe = await Usuario.findOne({ correo });
    if (existe)
      return res.status(400).json({ error: 'El correo ya está registrado' });

    const hash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, correo, password: hash });
    await usuario.save();

    res.json({ mensaje: 'Usuario registrado correctamente', id: usuario._id });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ── LOGIN ─────────────────────────────────────────────
app.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password)
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });

    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(401).json({ error: 'Credenciales incorrectas' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, nombre: usuario.nombre, correo: usuario.correo });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ── LISTAR usuarios ───────────────────────────────────
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find({}, '-password');
  res.json(usuarios);
});

// ── CREAR usuario ─────────────────────────────────────
app.post('/usuarios', async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json(usuario);
});

app.listen(3001, () => console.log('✅ Usuarios corriendo en puerto 3001'));