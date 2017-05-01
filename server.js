// file ./server.js
'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3090;
const appName = 'appName';

const routes = require('./app/routes');

const server = express();

server.use(cors());
server.use(logger('combined'));
server.use(bodyParser.json({ type: '*/*' }));

routes(server);


server.listen(port, () => {
  console.log('--> Starting ' + appName);
  console.log('--> Server listing on localhost:' + port);
})
