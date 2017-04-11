import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';

// rename this into any debugging string you wish to run on terminal
const debug = require('debug')('node-express-firebase:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.name}/?ssl=true`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 },
  reconnectTries: Number.MAX_VALUE } });

mongoose.connection.on('error', () => {
  debug(`unable to connect to database at ${Date.now}  in  ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, '0.0.0.0', () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

export default app;
