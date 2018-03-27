'use strict';
const Joi = require('joi');

const createUserSchema = {
    email: Joi.string().email().required(),      
    password: Joi.string().min(8).max(12).required(),
  };
  
module.exports = createUserSchema; 