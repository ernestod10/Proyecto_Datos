const usersRouter = require('./routes/users');

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// conexion a postgres
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432 
  });

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  app.use('/users', usersRouter);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
