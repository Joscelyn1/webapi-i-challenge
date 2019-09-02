// implement your API here
const express = require('express');
const Users = require('./data/db.js');
// Users has find(), findById(), insert(), remove(), update() methods

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello Joscelyn');
});

// see a list of users
server.get('/users', (req, res) => {
  // Hubs.find() returns a promise, we need the bros(.then, .catch)
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the list of users' });
    });
});

// add a user

server.post('/users', (req, res) => {
  const userInformation = req.body;

  Users.insert(userInformation)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'error adding the user' });
    });
});

// get a specific user
server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the specified user' });
    });
});

const port = 5000;

server.listen(port, () => console.log('api running'));
