const express = require('express');
const router = express.Router();


router.use(express.json());


//Este mock lo que hace es q devuelve el body enviado y tambien lo pone en la consola
module.exports = (pool) => {
  router.post('/', async (req, res) => {
    const imageData = req.body;

    const {
        id,
        idEmpresa,
        title,
        type,
        url,
        message,
        owner,
        size,
        created,
        modified,
        available,
        error,
        __typename,
        menu
    } = imageData;

    const query = 'INSERT INTO apitest (id, "idEmpresa", title, "type", url, "message", "owner", size, created, modified, available, "error", __typename, menu)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
    
    const values = [
        id,
        idEmpresa,
        title,
        type,
        url,
        message,
        owner,
        size,
        created,
        modified,
        available,
        error,
        __typename,
        JSON.stringify(menu)
    ];

    await pool.query(query, values);
    
    res.status(200).send(imageData);
    console.log(values);
});

  router.post('/img/', async (req, res) => {
    //await pool.query(query, values);
    res.status(200).json({ url: 'https://dummyimage.com/600x400/000/fff.jpg&text=test' });
    
    console.log('img url sent');
  });

  return router;
};

