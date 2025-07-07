const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { movie_id, reason } = req.body;
  db.query('INSERT INTO reports (movie_id, reason) VALUES (?, ?)', [movie_id, reason], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Reported successfully' });
  });
});

module.exports = router;
