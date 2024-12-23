const config = require('./config/index.config.js');
const Cortex = require('ion-cortex');
const ManagersLoader = require('./loaders/ManagersLoader.js');

// custom imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./loaders/db');
const schoolRoutes = require('./connect/schoolRoutes.js');
const classroomRoutes = require('./connect/classroomRoutes.js');
const studentRoutes = require('./connect/studentRoutes.js');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
// Additional route setups...

// Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;

// const mongoDB = config.dotEnv.MONGO_URI
//   ? require('./connect/mongo')({
//       uri: config.dotEnv.MONGO_URI,
//     })
//   : null;
