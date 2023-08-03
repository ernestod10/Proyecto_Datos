const express = require('express');
const router = express.Router();


router.use(express.json());


//Este mock lo que hace es q devuelve el body enviado y tambien lo pone en la consola
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
