const express = require('express');
const router = express.Router();

// Add the express.json() middleware to parse incoming JSON data
router.use(express.json());

module.exports = (pool) => {
  router.post('/', async (req, res) => {
    const imageData = req.body; 
    const query = 'INSERT INTO "test" (test1) VALUES ($1)';
    const values = [JSON.stringify(imageData)]; // Serialize the entire JSON data

    //await pool.query(query, values);
    res.status(200).send(imageData);
    
    console.log(values);
  });

  return router;
};
