const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/add', (req, res) => {
  const { movie_id, username, content, parent_id } = req.body;
  db.query(
    'INSERT INTO comments (movie_id, username, content, parent_id) VALUES (?, ?, ?, ?)',
    [movie_id, username, content, parent_id || null],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Comment added' });
    }
  );
});

router.get('/:movie_id', (req, res) => {
  const movie_id = req.params.movie_id;
  db.query('SELECT * FROM comments WHERE movie_id = ? ORDER BY created_at ASC',
    [movie_id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
});

module.exports = router;
