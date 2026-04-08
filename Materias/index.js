const express = require('express');

const app = express();
app.use(express.json());


let materias = [
  { id: 1, nombre: 'Matemáticas' },
  { id: 2, nombre: 'Programación' }
];


app.get('/materias', (req, res) => {
  res.json(materias);
});

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