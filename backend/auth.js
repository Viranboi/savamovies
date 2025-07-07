const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(401).send({ message: 'Invalid email' });

    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).send({ message: 'Wrong password' });

    res.send({ message: 'Login successful' });
  });
});

module.exports = router;
