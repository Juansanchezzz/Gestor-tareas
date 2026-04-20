const express  = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexión MongoDB
mongoose.connect('mongodb://mongodb:27017/materias_db')
  .then(() => console.log('✅ Materias - Mongo conectado'))
  .catch(err => console.log('❌ Error Mongo:', err));

// Modelo
const Materia = mongoose.model('Materia', {
  id:     Number,
  nombre: String
});

// Contador para el ID autoincremental
async function siguienteId() {
  const ultima = await Materia.findOne().sort({ id: -1 });
  return ultima ? ultima.id + 1 : 1;
}

// GET materias
app.get('/materias', async (req, res) => {
  try {
    const materias = await Materia.find({}, '-_id -__v');
    res.json(materias);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo materias' });
  }
});

// POST materias
app.post('/materias', async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const id      = await siguienteId();
    const materia = new Materia({ id, nombre });
    await materia.save();

    res.json({ id, nombre });
  } catch (err) {
    res.status(500).json({ error: 'Error creando materia' });
  }
});

app.listen(3002, () => console.log('✅ Materias corriendo en puerto 3002'));