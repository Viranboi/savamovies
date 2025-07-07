const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movieRoutes = require('./routes/movies');
const commentRoutes = require('./routes/comments');
//const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');

const app = express(); // 🔥 this must be BEFORE any app.use()

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/movies', movieRoutes);
app.use('/api/comments', commentRoutes);
//app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
