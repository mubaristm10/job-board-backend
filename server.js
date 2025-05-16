const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./Routes');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require('./db');
app.use('/api', routes);
app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.listen(8888, () => {
  console.log('server is running @http://localhost:8888');
});
