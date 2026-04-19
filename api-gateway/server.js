const express = require('express');
const axios   = require('axios');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ── AUTENTICACIÓN ─────────────────────────────────────

app.post('/registro', async (req, res) => {
  try {
    const resp = await axios.post('http://usuarios:3001/registro', req.body);
    res.json(resp.data);
  } catch (err) {
    const msg = err.response?.data || { error: 'Error en registro' };
    res.status(err.response?.status || 500).json(msg);
  }
});

app.post('/login', async (req, res) => {
  try {
    const resp = await axios.post('http://usuarios:3001/login', req.body);
    res.json(resp.data);
  } catch (err) {
    const msg = err.response?.data || { error: 'Error en login' };
    res.status(err.response?.status || 500).json(msg);
  }
});

// ── USUARIOS ──────────────────────────────────────────

app.get('/usuarios', async (req, res) => {
  try {
    const resp = await axios.get('http://usuarios:3001/usuarios');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en usuarios' });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const resp = await axios.post('http://usuarios:3001/usuarios', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando usuario' });
  }
});

// ── MATERIAS ──────────────────────────────────────────

app.get('/materias', async (req, res) => {
  try {
    const resp = await axios.get('http://materias:3002/materias');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en materias' });
  }
});

app.post('/materias', async (req, res) => {
  try {
    const resp = await axios.post('http://materias:3002/materias', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando materia' });
  }
});

// ── TAREAS ────────────────────────────────────────────

app.get('/tareas', async (req, res) => {
  try {
    const resp = await axios.get('http://tareas:3003/tareas');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en tareas' });
  }
});

app.post('/tareas', async (req, res) => {
  try {
    const resp = await axios.post('http://tareas:3003/tareas', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando tarea' });
  }
});

app.listen(3000, () => console.log('✅ API Gateway corriendo en puerto 3000'));