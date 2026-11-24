const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Array en memoria (se pierde al reiniciar el servidor)
const productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 45 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 20 },
];
let siguienteId = 3;

// GET: retorna el array completo
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// POST: recibe JSON { nombre, precio } y lo agrega al array
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body ?? {};

  if (typeof nombre !== 'string' || nombre.trim() === '' || typeof precio !== 'number' || precio < 0) {
    return res.status(400).json({ error: 'Se requiere nombre (texto) y precio (número >= 0)' });
  }

  const nuevo = { id: siguienteId++, nombre: nombre.trim(), precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
