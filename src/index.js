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

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error);
});


// uso de las rutas


// Ruta por defecto
app.get('/', (req, res) => {
  res.json({ 
    message: 'Scrum Dashboard API running!',
    database: 'MongoDB Atlas',
    status: 'Connected'
  });
});

//Escucha del app en el puerto
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});