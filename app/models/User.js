// file: ./app/models/User.js
'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (database, DataTypes) => {

  const User = database.define('User', {
    Email: { type: DataTypes.STRING, primaryKey: true },
    Password: { type: DataTypes.STRING, required: true }
  }, {
    classMethods: {
        generateHash: function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
    }, instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.Password);
      }
    }
}); // end User

  return User;

}; // end module exports model
