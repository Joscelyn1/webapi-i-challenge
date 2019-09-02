// implement your API here
const express = require('express');
const Data = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello Joscelyn');
});

const port = 5000;

server.listen(port, () => console.log('api running'));
