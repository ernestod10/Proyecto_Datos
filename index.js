const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();





const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
const martRouter = require('./routes/mart')(pool);

// conexion a postgres

  app.use('/mart', martRouter);
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
