// file: ./app/controllers/authentication.js
'use strict';

const jwt = require('jwt-simple');
const Database = require('../libs/Database');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.Email, iat: timestamp }, config.secret);
}

exports.signup = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.' });
  }

  Database.models.User.find({ where: { Email: email } })
    .then(userExists => {
      if (userExists) {
        return res.status(422).send({ error: 'Email address is already in use.' });
      }

      let hashedPassword = Database.models.User.generateHash(password);

      Database.models.User.create({ Email: email, Password: hashedPassword })
        .then(user => {
          res.json({ token: tokenForUser(user) });
        })
        .catch(error => {
          console.log(JSON.stringify(error, null, 1));
          return res.status(500).send({ error: 'Whoops!  Something went wrong.  Please try again.' });
        });
    })
    .catch(error => {
      console.log(JSON.stringify(error, null, 1));
      return res.status(500).send({ error: 'Whoops!  Something went wrong.  Please try again.' });
    });
}; // end exports.signup


exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}; // end export signin
