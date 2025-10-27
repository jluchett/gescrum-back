import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// importamos las rutas


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (local)
mongoose.connect('mongodb://localhost:27017/scrum_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// uso de las rutas

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({ message: 'Scrum Dashboard API running!' });
});

//Escucha del app en el puerto
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});