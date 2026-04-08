const express = require('express');

const app = express();
app.use(express.json());

// 📦 Datos en memoria
let materias = [
  { id: 1, nombre: 'Matemáticas' },
  { id: 2, nombre: 'Programación' }
];

// 📌 GET - listar materias
app.get('/materias', (req, res) => {
  res.json(materias);
});

// 📌 POST - crear materia
app.post('/materias', (req, res) => {
  const { nombre } = req.body;

  const nuevaMateria = {
    id: materias.length + 1,
    nombre
  };

  materias.push(nuevaMateria);
  res.json(nuevaMateria);
});

app.listen(3002, () => {
  console.log('Microservicio Materias en puerto 3002');
});