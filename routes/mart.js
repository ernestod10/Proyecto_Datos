const express = require('express');
const router = express.Router();
// Get 
module.exports = (pool) => {
  router.post('/', async (req, res) => {
    const imageData = req.body; // Assuming the entire JSON data is sent in the request body
    
    try {
      // Assuming "TEST" is the table name and "test1" is the column name
      const query = 'INSERT INTO "TEST" (test1) VALUES ($1)';
      const values = [JSON.stringify(imageData)]; // Serialize the entire JSON data
      await pool.query(query, values);

      res.status(200).send('Data received and inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('An error occurred while inserting data');
    }
  });

return router;
};