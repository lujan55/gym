const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
const dbName = 'gym'; // Nombre de tu base de datos
const collectionName = 'rutina'; // Nombre de tu colección
const mongoURI = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`Conectado a MongoDB en ${mongoURI}`))
  .catch(err => console.error('Error al conectar con MongoDB:', err.message));

// Definir el esquema y el modelo de rutinas
const RoutineSchema = new mongoose.Schema({
  muscle: { type: String, required: true },
  exercises: [{ type: String, required: true }],
}, {
  collection: collectionName // Nombre de la colección en MongoDB
});

const Routine = mongoose.model('Routine', RoutineSchema);

// Ruta para obtener rutina por músculo
app.get('/routine', async (req, res) => {
  const { muscle } = req.query;

  // Validación básica de entrada
  if (!muscle || typeof muscle !== 'string') {
    return res.status(400).json({ message: 'El parámetro "muscle" es inválido' });
  }

  try {
    const routine = await Routine.findOne({ muscle });

    if (!routine) {
      return res.status(404).json({ message: `No se encontró rutina para el músculo "${muscle}"` });
    }

    res.json(routine);
  } catch (err) {
    console.error('Error al buscar la rutina:', err.message);
    res.status(500).json({ message: 'Error interno al buscar la rutina' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en puerto ${PORT}`);
});
