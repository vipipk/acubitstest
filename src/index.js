const {
  env, port
} = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');

// open mongoose connection
mongoose.connect();

const server = app.listen(port, () => console.info(`server started on port ${port} (${env})`));
