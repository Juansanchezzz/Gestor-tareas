const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());



// GET usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const resp = await axios.get('http://usuarios:3001/usuarios');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en usuarios' });
  }
});

// POST usuarios
app.post('/usuarios', async (req, res) => {
  try {
    const resp = await axios.post('http://usuarios:3001/usuarios', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando usuario' });
  }
});




// GET materias
app.get('/materias', async (req, res) => {
  try {
    const resp = await axios.get('http://materias:3002/materias');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en materias' });
  }
});

// POST materias
app.post('/materias', async (req, res) => {
  try {
    const resp = await axios.post('http://materias:3002/materias', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando materia' });
  }
});



// GET tareas
app.get('/tareas', async (req, res) => {
  try {
    const resp = await axios.get('http://tareas:3003/tareas');
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error en tareas' });
  }
});

// POST tareas
app.post('/tareas', async (req, res) => {
  try {
    const resp = await axios.post('http://tareas:3003/tareas', req.body);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: 'Error creando tarea' });
  }
});

app.listen(3000, () => console.log('API Gateway corriendo en puerto 3000'));