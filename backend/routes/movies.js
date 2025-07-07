const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all movies
router.get('/', (req, res) => {
  db.query('SELECT * FROM movies ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
});

// Add movie
router.post('/add', (req, res) => {
  const { name, video_link, thumbnail_link, description, category } = req.body;
  if (!name || !video_link || !thumbnail_link || !description) {
    return res.status(400).send({ message: 'Please provide all required fields.' });
  }
  const sql = 'INSERT INTO movies (name, video_link, thumbnail_link, description, category) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, video_link, thumbnail_link, description, category || null], (err) => {
    if (err) return res.status(500).send('Server error');
    res.send({ message: 'Movie added successfully!' });
  });
});

// Search movies
router.get('/search', (req, res) => {
  const { q, category } = req.query;
  let sql = 'SELECT * FROM movies WHERE 1=1';
  const params = [];
  if (q) {
    sql += ' AND name LIKE ?';
    params.push('%' + q + '%');
  }
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
});

module.exports = router;
