/**
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex implementation of a web application that
 *              allows users to create, edit, and delete tasks. It includes various features
 *              such as authentication, data persistence, and task prioritization.
 */

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();

// Enable parsing of JSON data
app.use(bodyParser.json());

// Mock database
let tasks = [];

// Define authentication routes
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the database

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during registration' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from the database

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isMatch) {
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during login' });
  }
});

// Middleware to validate JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Define CRUD routes for tasks
app.get('/tasks', verifyToken, (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.user.userId);
  res.status(200).json(userTasks);
});

app.post('/tasks', verifyToken, (req, res) => {
  const { description, priority } = req.body;
  const newTask = {
    id: tasks.length + 1,
    description,
    priority,
    userId: req.user.userId,
  };
  tasks.push(newTask);

  res.status(201).json({ message: 'Task created successfully' });
});

app.put('/tasks/:id', verifyToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, priority } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Update task properties
    tasks[taskIndex].description = description;
    tasks[taskIndex].priority = priority;

    res.status(200).json({ message: 'Task updated successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', verifyToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});