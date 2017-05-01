// file ./app/routes.js
'use strict';

const passport = require('passport');
const passportService = require('./libs/passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

  app.get('/test', (req, res) => {
    res.json({ test: 'success!' });
  });

  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);


}; // end module.exports
