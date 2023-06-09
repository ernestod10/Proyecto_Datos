require('dotenv').config();

const martRouter = require('./routes/mart');

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;


// conexion a postgres
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  
  app.use('/mart', martRouter);
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
