const express = require('express');

const app = express();
app.use(express.json());

// 📦 Datos en memoria
let tareas = [
  { id: 1, titulo: 'Estudiar cálculo', usuarioId: 1, materiaId: 1 },
  { id: 2, titulo: 'Hacer ejercicio de Java', usuarioId: 1, materiaId: 2 }
];

// 📌 GET - listar tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// 📌 POST - crear tarea
app.post('/tareas', (req, res) => {
  const { titulo, usuarioId, materiaId } = req.body;

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    usuarioId,
    materiaId
  };

  tareas.push(nuevaTarea);
  res.json(nuevaTarea);
});

app.listen(3003, () => {
  console.log('Microservicio Tareas en puerto 3003');
});