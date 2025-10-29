import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sprint from '../models/Sprint.js';
import Task from '../models/Task.js';
import Team from '../models/Team.js';

dotenv.config();

const seedSprint1Data = async () => {
  try {
    // Conectar a MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    //Limpiar datos existentes (opcional - comenta si no quieres borrar datos existentes)
    await Sprint.deleteMany({});
    await Task.deleteMany({});
    await Team.deleteMany({});

    // Crear equipo de desarrollo
    console.log('👥 Creando equipo de desarrollo...');
    const teamMembers = await Team.insertMany([
      {
        name: 'Juan Pérez',
        role: 'developer',
        email: 'juan@telegramjsf.com',
        capacity: 13,
        active: true
      },
      {
        name: 'María García',
        role: 'developer',
        email: 'maria@telegramjsf.com',
        capacity: 13,
        active: true
      },
      {
        name: 'Carlos López',
        role: 'developer',
        email: 'carlos@telegramjsf.com',
        capacity: 13,
        active: true
      },
      {
        name: 'Ana Martínez',
        role: 'scrum-master',
        email: 'ana@telegramjsf.com',
        capacity: 0,
        active: true
      }
    ]);
    console.log(`✅ ${teamMembers.length} miembros del equipo creados`);

    // Crear Sprint 1 - Configuración Básica
    console.log('🎯 Creando Sprint 1...');
    const sprint1 = await Sprint.create({
      name: 'Sprint 1 - Configuración Básica e Integración',
      goal: 'Establecer la base del proyecto con autenticación de Telegram y mensajería básica funcionando',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-14'),
      status: 'completed',
      plannedPoints: 34,
      completedPoints: 32,
      velocity: 94
    });
    console.log(`✅ Sprint 1 creado: ${sprint1.name}`);

    // Crear tareas del Sprint 1
    console.log('📝 Creando tareas del Sprint 1...');
    const sprint1Tasks = await Task.insertMany([
      // Tareas COMPLETADAS (32 points)
      {
        title: 'Configurar entorno de desarrollo Java + TDLib',
        description: 'Instalar y configurar todas las dependencias necesarias para el backend con Java y TDLib. Configurar variables de entorno y estructura del proyecto.',
        assignee: 'Juan Pérez',
        storyPoints: 5,
        priority: 'high',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-03'),
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03')
      },
      {
        title: 'Implementar autenticación con Telegram MTProto',
        description: 'Desarrollar sistema de login usando número telefónico y código OTP. Integrar con la API de Telegram MTProto.',
        assignee: 'María García',
        storyPoints: 8,
        priority: 'high',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-06'),
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-05')
      },
      {
        title: 'Crear interfaz básica de lista de chats',
        description: 'Desarrollar componente React para mostrar lista de conversaciones con búsqueda básica.',
        assignee: 'Carlos López',
        storyPoints: 3,
        priority: 'medium',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-04'),
        createdAt: new Date('2024-05-02'),
        updatedAt: new Date('2024-05-04')
      },
      {
        title: 'Configurar servidor Apache Tomcat',
        description: 'Preparar entorno de despliegue con Tomcat y configurar aplicación JSF.',
        assignee: 'Juan Pérez',
        storyPoints: 2,
        priority: 'medium',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-03'),
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03')
      },
      {
        title: 'Implementar envío de mensajes de texto básicos',
        description: 'Crear funcionalidad para enviar mensajes de texto simples a contactos y grupos.',
        assignee: 'María García',
        storyPoints: 5,
        priority: 'high',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-08'),
        createdAt: new Date('2024-05-03'),
        updatedAt: new Date('2024-05-07')
      },
      {
        title: 'Desarrollar recepción de mensajes en tiempo real',
        description: 'Implementar sistema para recibir y mostrar mensajes entrantes en la interfaz.',
        assignee: 'Carlos López',
        storyPoints: 5,
        priority: 'high',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-10'),
        createdAt: new Date('2024-05-04'),
        updatedAt: new Date('2024-05-09')
      },
      {
        title: 'Configurar base de datos MongoDB Atlas',
        description: 'Conectar aplicación con MongoDB Atlas y crear modelos básicos.',
        assignee: 'Juan Pérez',
        storyPoints: 2,
        priority: 'medium',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-05'),
        createdAt: new Date('2024-05-02'),
        updatedAt: new Date('2024-05-04')
      },
      {
        title: 'Realizar pruebas de integración iniciales',
        description: 'Ejecutar pruebas end-to-end del flujo completo de autenticación y mensajería.',
        assignee: 'Ana Martínez',
        storyPoints: 2,
        priority: 'medium',
        status: 'done',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-13'),
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-12')
      },

      // Tareas PENDIENTES (2 points - no completadas en el sprint)
      {
        title: 'Optimizar manejo de errores en autenticación',
        description: 'Mejorar sistema de manejo de errores para casos edge en el proceso de login.',
        assignee: 'María García',
        storyPoints: 2,
        priority: 'low',
        status: 'todo',
        sprintId: sprint1._id,
        dueDate: new Date('2024-05-14'),
        createdAt: new Date('2024-05-08'),
        updatedAt: new Date('2024-05-08')
      }
    ]);
    console.log(`✅ ${sprint1Tasks.length} tareas creadas para el Sprint 1`);

    // Crear Sprint 2 (Activo) para tener continuidad
    console.log('🚀 Creando Sprint 2...');
    const sprint2 = await Sprint.create({
      name: 'Sprint 2 - Funcionalidades Avanzadas',
      goal: 'Implementar mensajería avanzada, programación de mensajes y sistema de automatización',
      startDate: new Date('2024-05-15'),
      endDate: new Date('2024-05-28'),
      status: 'active',
      plannedPoints: 29,
      completedPoints: 12,
      velocity: 41
    });
    console.log(`✅ Sprint 2 creado: ${sprint2.name}`);

    // Crear algunas tareas para el Sprint 2
    console.log('📝 Creando tareas del Sprint 2...');
    const sprint2Tasks = await Task.insertMany([
      {
        title: 'Implementar programación de mensajes',
        description: 'Desarrollar sistema para enviar mensajes en fecha/hora específica usando timestamps.',
        assignee: 'Juan Pérez',
        storyPoints: 8,
        priority: 'high',
        status: 'in-progress',
        sprintId: sprint2._id,
        dueDate: new Date('2024-05-22'),
        createdAt: new Date('2024-05-15')
      },
      {
        title: 'Desarrollar envío de multimedia (imágenes, audio)',
        description: 'Extender funcionalidad de mensajes para soportar archivos multimedia.',
        assignee: 'María García',
        storyPoints: 8,
        priority: 'high',
        status: 'todo',
        sprintId: sprint2._id,
        dueDate: new Date('2024-05-25'),
        createdAt: new Date('2024-05-15')
      },
      {
        title: 'Crear sistema de botones interactivos',
        description: 'Implementar botones inline para respuestas rápidas y menús interactivos.',
        assignee: 'Carlos López',
        storyPoints: 5,
        priority: 'medium',
        status: 'todo',
        sprintId: sprint2._id,
        dueDate: new Date('2024-05-24'),
        createdAt: new Date('2024-05-16')
      },
      {
        title: 'Configurar respuestas automáticas básicas',
        description: 'Implementar sistema de respuestas automáticas para mensajes comunes.',
        assignee: 'Juan Pérez',
        storyPoints: 8,
        priority: 'medium',
        status: 'backlog',
        sprintId: sprint2._id,
        dueDate: new Date('2024-05-27'),
        createdAt: new Date('2024-05-17')
      }
    ]);
    console.log(`✅ ${sprint2Tasks.length} tareas creadas para el Sprint 2`);

    // Crear algunas tareas en backlog
    console.log('📥 Creando tareas en backlog...');
    const backlogTasks = await Task.insertMany([
      {
        title: 'Implementar envío de ubicación en tiempo real',
        description: 'Desarrollar funcionalidad para compartir ubicación estática y en vivo.',
        assignee: 'María García',
        storyPoints: 5,
        priority: 'medium',
        status: 'backlog',
        dueDate: new Date('2024-06-05'),
        createdAt: new Date('2024-05-20')
      },
      {
        title: 'Crear sistema de plantillas de mensajes',
        description: 'Desarrollar plantillas personalizables con variables dinámicas.',
        assignee: 'Carlos López',
        storyPoints: 3,
        priority: 'low',
        status: 'backlog',
        dueDate: new Date('2024-06-10'),
        createdAt: new Date('2024-05-18')
      },
      {
        title: 'Optimizar rendimiento para muchos mensajes',
        description: 'Mejorar performance del sistema cuando hay alto volumen de mensajes.',
        assignee: 'Juan Pérez',
        storyPoints: 8,
        priority: 'medium',
        status: 'backlog',
        dueDate: new Date('2024-06-15'),
        createdAt: new Date('2024-05-19')
      }
    ]);
    console.log(`✅ ${backlogTasks.length} tareas creadas en backlog`);

    // Resumen final
    console.log('\n🎉 DATOS CARGADOS EXITOSAMENTE!');
    console.log('================================');
    console.log(`👥 Team Members: ${teamMembers.length}`);
    console.log(`🎯 Sprints: 2 (1 completado, 1 activo)`);
    console.log(`📝 Total Tasks: ${sprint1Tasks.length + sprint2Tasks.length + backlogTasks.length}`);
    console.log(`✅ Sprint 1: 32/34 points completados (94% velocidad)`);
    console.log(`🚀 Sprint 2: 12/29 points completados (41% velocidad en progreso)`);
    console.log(`📥 Backlog: ${backlogTasks.length} tareas pendientes`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedSprint1Data();