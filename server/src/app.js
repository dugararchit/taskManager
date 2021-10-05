const express = require('express');
const cors = require('cors');

const routes = require('./routes/v1');

const app = express();
// enable cors
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/v1', routes);

module.exports = app;
