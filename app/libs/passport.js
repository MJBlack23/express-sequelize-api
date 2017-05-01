// file: ./app/libs/passport.js
'use strict';

const passport = require('passport');
const Database = require('./Database');
const config = require('../config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

// create LocalStrategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  Database.models.User.find({ where: { Email: email } } )
    .then(user => {
      if (!user) { return done(null, false); }

      if (!user.validPassword(password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }

    })
    .catch(error => {
      console.log('error querying User model');
      done({ error: 'Whoops! Something went wrong, please try again.' });
    });
}); // end localLogin

// set up the options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
  , secretOrKey: config.secret
};


// create the jwt strategy
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
   Database.models.User.find({ where: { Email: payload.sub } })
     .then(user => {
       if (!user) { done(null, false); }

       done(null, user);
     })
     .catch(error => {
       console.log(JSON.stringify(error, null, 1));
       done(error, false);
     });
}); // end jwt login

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
