'use strict';

require('dotenv').config();
const Hapi = require('hapi');
const mongoose = require('mongoose');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const routes = require('./src/routes');
const User = require('./src/models/User');
const MongoDBUrl = process.env.MONGO_URL;

const server = new Hapi.Server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0'
});

const SECRET_KEY = process.env.SECRET_KEY;

const validate = async function (decoded, request, h) {
  //Default to True while running tests
  if (process.env.NODE_ENV === 'test') {
    return { isValid: true };
  }

  return User.findById(decoded.id, ['_id']).exec().then((usr) => {
    if (!usr) return { isValid: false };
    else {
      return { isValid: true };
    };
  }).catch((err) => {
    return { isValid: false };
  });
};



(async () => {
  try {

    //Register Swagger 
    const swaggerOptions = {
      info: {
        title: 'Pager Organization API '
      }
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);

    //Register JWT
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
      {
        key: SECRET_KEY,
        validate,
        verifyOptions: { algorithms: ['HS256'] }
      });
    server.auth.default('jwt');
    
    //Register Routes
    server.route(routes);

    //Start Server
    await server.start();

    //Connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl, {}).then(() => {
      console.log(`Connected to Mongo server`)
    },
      err => {
        console.log(err)
      });
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {
    console.log(err)
  }
})();

module.exports = server;

