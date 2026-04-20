const express  = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexión MongoDB
mongoose.connect('mongodb://mongodb:27017/tareas_db')
  .then(() => console.log('✅ Tareas - Mongo conectado'))
  .catch(err => console.log('❌ Error Mongo:', err));

// Modelo
const Tarea = mongoose.model('Tarea', {
  id:        Number,
  titulo:    String,
  usuarioId: mongoose.Schema.Types.Mixed,
  materiaId: Number
});

// Contador para el ID autoincremental
async function siguienteId() {
  const ultima = await Tarea.findOne().sort({ id: -1 });
  return ultima ? ultima.id + 1 : 1;
}

// GET tareas
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find({}, '-_id -__v');
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo tareas' });
  }
});

// POST tareas
app.post('/tareas', async (req, res) => {
  try {
    const { titulo, usuarioId, materiaId } = req.body;
    if (!titulo || !usuarioId || !materiaId)
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });

    const id    = await siguienteId();
    const tarea = new Tarea({ id, titulo, usuarioId, materiaId });
    await tarea.save();

    res.json({ id, titulo, usuarioId, materiaId });
  } catch (err) {
    res.status(500).json({ error: 'Error creando tarea' });
  }
});

app.listen(3003, () => console.log('✅ Tareas corriendo en puerto 3003'));