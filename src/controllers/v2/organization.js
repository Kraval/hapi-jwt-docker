const Org = require('../../models/Organization');
const Boom = require('boom');
const Joi = require('joi');

/**
 * Hello Method
 */
exports.hello = (req, h) => {
  return { message: 'Hello from Organization V2 API' };
}

