import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sprint from '../models/Sprint.js';
import Task from '../models/Task.js';
import Team from '../models/Team.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await Sprint.deleteMany({});
    await Task.deleteMany({});
    await Team.deleteMany({});

    // Create team members
    const teamMembers = await Team.insertMany([
      {
        name: 'Juan',
        role: 'developer',
        email: 'juan@telegramjsf.com',
        capacity: 13
      },
      {
        name: 'María',
        role: 'developer', 
        email: 'maria@telegramjsf.com',
        capacity: 13
      },
      {
        name: 'Carlos',
        role: 'developer',
        email: 'carlos@telegramjsf.com', 
        capacity: 13
      },
      {
        name: 'Tú (Scrum Master)',
        role: 'scrum-master',
        email: 'scrummaster@telegramjsf.com',
        capacity: 0
      }
    ]);

    // Create sprints
    const sprint1 = await Sprint.create({
      name: 'Sprint 1 - Configuración Básica',
      goal: 'Establecer base del proyecto con autenticación y mensajería básica',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-14'),
      status: 'completed',
      plannedPoints: 34,
      completedPoints: 34
    });

    const sprint2 = await Sprint.create({
      name: 'Sprint 2 - Funcionalidades Avanzadas',
      goal: 'Implementar mensajería avanzada, programación y automatización',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-06-28'),
      status: 'active',
      plannedPoints: 29,
      completedPoints: 12
    });

    // Create tasks for Sprint 2
    const tasks = await Task.insertMany([
      {
        title: 'US06 - Mensajes Programados',
        description: 'Implementar sistema de programación de mensajes para envío diferido',
        assignee: 'Juan',
        storyPoints: 8,
        priority: 'high',
        status: 'in-progress',
        sprintId: sprint2._id,
        dueDate: new Date('2024-06-18')
      },
      {
        title: 'US07 - Multimedia',
        description: 'Desarrollar envío de imágenes, audio y documentos',
        assignee: 'María', 
        storyPoints: 8,
        priority: 'high',
        status: 'todo',
        sprintId: sprint2._id,
        dueDate: new Date('2024-06-20')
      },
      {
        title: 'US08 - Botones Interactivos',
        description: 'Crear sistema de botones inline para respuestas rápidas',
        assignee: 'Carlos',
        storyPoints: 5,
        priority: 'high',
        status: 'todo',
        sprintId: sprint2._id,
        dueDate: new Date('2024-06-22')
      },
      {
        title: 'US09 - Respuestas Automáticas',
        description: 'Configurar sistema de respuestas automáticas condicionales',
        assignee: 'Juan',
        storyPoints: 8,
        priority: 'medium',
        status: 'backlog',
        sprintId: sprint2._id
      }
    ]);

    console.log('✅ Datos iniciales creados exitosamente!');
    console.log(`👥 Team members: ${teamMembers.length}`);
    console.log(`🎯 Sprints: 2`);
    console.log(`📝 Tasks: ${tasks.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();