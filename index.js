// implement your API here
const express = require('express');
const Users = require('./data/db.js');
// Users has find(), findById(), insert(), remove(), update() methods

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello Joscelyn. Do you want to play a game?');
});

// see a list of users
server.get('/users', (req, res) => {
  // Hubs.find() returns a promise, we need the bros(.then, .catch)
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

// add a user

server.post('/users', (req, res) => {
  const userInformation = req.body;

  Users.insert(userInformation)
    .then(user => {
      if (!userInformation.name || !userInformation.bio) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'There was an error while saving the user to the database'
      });
    });
});

// get a specific user
server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'The user information could not be retrieved.' });
    });
});

// delete a Hub

server.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  Users.remove(userId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'The user could not be removed' });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(updated => {
      if (!changes.name || !changes.bio) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      } else if (!updated) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'The user information could not be modified.' });
    });
});

const port = 5000;

server.listen(port, () => console.log('api running'));
