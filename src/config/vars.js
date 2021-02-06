const path = require('path');

let envFile;
switch (process.env.NODE_ENV) {
  case 'production':
    envFile = '../../.env.production';
    break;
  case 'development':
    envFile = '../../.env';
    break;
  default:
    envFile = '../../.env';
}

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, envFile),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
