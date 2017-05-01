// file: ./app/libs/Database.js
'use strict';

const config = require('../config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host
  , dialect: config.db.dialect
  , pool: {
    max: 5
    , min: 0
    , idle: 10000
  }
  , logging: false
  , timezone: 'America/Chicago'
});

// create the export variable
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// apply the models
db.models = {};
db.models.Hashtag = require('../models/Hashtag')(sequelize, Sequelize);
db.models.RelatedTag = require('../models/RelatedTag')(sequelize, Sequelize);
db.models.Tweet = require('../models/Tweet')(sequelize, Sequelize);
db.models.User = require('../models/User')(sequelize, Sequelize);
db.models.UserMention = require('../models/UserMention')(sequelize, Sequelize);

module.exports = db;
