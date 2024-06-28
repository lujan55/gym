// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [muscle, setMuscle] = useState('');
  const [routine, setRoutine] = useState(null);

  const fetchRoutine = async () => {
    try {
      const response = await axios.get(`/routine?muscle=${muscle}`);
      setRoutine(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener la rutina');
    }
  };

  return (
    <div className="App">
      <h1>Obtener Rutina por Músculo</h1>
      <input
        type="text"
        placeholder="Ingrese un músculo"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
      />
      <button onClick={fetchRoutine}>Obtener Rutina</button>

      {routine && (
        <div>
          <h2>Rutina para {routine.muscle}</h2>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
