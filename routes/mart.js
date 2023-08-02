const express = require('express');
const router = express.Router();
// Get 
module.exports = (pool) => {
  router.post('/', async (req, res) => {
    const imageData = req.body; // Assuming the entire JSON data is sent in the request body
    
  

      const query = 'INSERT INTO "test" (test1) VALUES ($1)';
      const values = [JSON.stringify(imageData)]; // Serialize the entire JSON data
     // await pool.query(query, values);



      console.log(values);
    
  
  });

return router;
};