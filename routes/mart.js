const express = require('express');
const router = express.Router();
// Get 
module.exports = (pool) => {
  router.post('/', async (req, res) => {
    const { title, url } = req.body;
    
    try {
      
      const query = 'INSERT INTO "TEST" (test1) VALUES ($1)';
      const values = [JSON.stringify({ title, url })]; // Serialize the content to a JSON string
      await pool.query(query, values);

      res.status(200).send('Data received and inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('An error occurred while inserting data');
    }
  });

return router;
};