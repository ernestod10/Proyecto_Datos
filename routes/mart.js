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


router.get('/', async (req, res) => {
  try {
      const query = 'SELECT * FROM "apitest"';
      const result = await pool.query(query);
      //console.log("new request");
      //console.log(result.rows);
      const response = {
        "id": "1",
        "item": {
          "id": 1
        },
        "title": "Galeria",
        "columnsResum": [
          "url",
          "title",
          "owner",
          "modified",
          "menu"
        ],
        "type": [
          "img",
          "string",
          "string",
          "date",
          "menu"
        ],
        "typeResum": [
          "img",
          "string",
          "string",
          "date",
          "menu"
        ],
        "menu": [
          "Eliminar/delete",
          "Editar/edit",
          "Preview/preview"
        ],
        "rows": result.rows, // Use the database query result here
      };

      res.status(200).json(response);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


  router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    const {
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
    } = updatedData;

    const query = 'UPDATE "apitest" SET idEmpresa = $1,title = $2,type = $3,  url = $4, message = $5, owner = $6,   size = $7, created = $8, modified = $9,  available = $10,  error = $11,   __typename = $12,   menu = $13 WHERE id = $14;'
    const values = [
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
        JSON.stringify(menu),
        id
    ];

    try {
        await pool.query(query, values);
        res.status(200).send('Record updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });



  router.post('/img/', async (req, res) => {
    //await pool.query(query, values);
    res.status(200).json({ url: 'https://dummyimage.com/600x400/000/fff.jpg&text=test' });
    
    console.log('img url sent');
  });

  return router;
};

