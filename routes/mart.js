const express = require('express');
const router = express.Router();
const cron = require('node-cron');


router.use(express.json());


/*
*prototipo de api que se conecta a una base de datos mock de prueba en postgresql
*/
module.exports = (pool) => {
  var contador = 0;
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM "apitest" WHERE id = $1';
    const values = [id];

    try {
        await pool.query(query, values);
        res.status(200).json({ message: 'Record deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
  });
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
        "title": "Banners",
        "columnsResum": [
          "url",
          "title",
          "owner",
          "modified",
          "available",
          "menu"
        ],
        "type": [
          "img",
          "string",
          "string",
          "date",
          "string",
          "menu"
        ],
        "typeResum": [
          "img",
          "string",
          "string",
          "date",
          "string",
          "menu"
        ],
        "menu": [
          "Eliminar/delete",
          "Editar/edit",
          "Preview/preview",
          "Fechas/dates",
        ],
        "rows": result.rows, // Use the database query result here
      };

      res.status(200).json(response);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


  router.put('/:id', async (req, res) => {
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
        start_date,
        end_date,
        error,
        __typename,
        menu
    } = updatedData;

    const query = 'UPDATE "apitest" SET "idEmpresa" = $1,title = $2,"type" = $3,  url = $4, "message" = $5, "owner" = $6,   size = $7, created = $8, modified = $9,  available = $10, start_date = $11, end_date = $12,  "error" = $13,   __typename = $14,  menu = $15 WHERE id = $16;'
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
        start_date,
        end_date,
        error,
        __typename,
        JSON.stringify(menu),
        id
    ];

    try {
        await pool.query(query, values);
        res.status(200).json({ message: 'Record updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
  });



  router.post('/img/', async (req, res) => {
    //await pool.query(query, values);
    contador++;
    res.status(200).json({ url: 'https://dummyimage.com/600x400/000/fff.jpg&text=test'+'$contador' });
    
    console.log('img url sent');
  });


  /*
  * CRON JOB PARA ACTUALIZAR EL CAMPO AVAILABLE DE LA TABLA SE EJECTUA CADA 2 HORAS
  */
  cron.schedule('*/15 */2 * * *', async () => {
    try {
      const selectQuery = 'SELECT * FROM apitest';
      const rows = await pool.query(selectQuery);
  
      const currentDate = new Date();
      //Recorre cada fila de la tabla
      for (const row of rows.rows) {
        const { start_date, end_date } = row;
        //VERIFICA QUE NO SEAN NULL
        if (start_date && end_date) {
          const startDate = new Date(start_date);
          const endDate = new Date(end_date);
          //Hace la comparacion de fechas con la fecha actual
          if (currentDate >= startDate && currentDate <= endDate) {
            //Si la fecha actual esta entre las fechas de inicio y fin, actualiza el campo available a true
            const updateQuery = 'UPDATE apitest SET available = $1 WHERE id = $2';
            await pool.query(updateQuery, [true, row.id]);
          } else {
            //Si la fecha actual no esta entre las fechas de inicio y fin, actualiza el campo available a false
            const updateQuery = 'UPDATE apitest SET available = $1 WHERE id = $2';
            await pool.query(updateQuery, [false, row.id]);
          }
        }
      }
      console.log('Scheduled task executed at:', new Date());
    } catch (error) {
      console.error(error);
    }
  });

  return router;
};

