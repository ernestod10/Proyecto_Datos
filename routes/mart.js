const express = require('express');
const router = express.Router();
// Get 
module.exports = (pool) => {
router.get('/', (req, res) => {
    pool.query('SELECT * FROM ', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result.rows);
      }
    });
  });
return router;
};