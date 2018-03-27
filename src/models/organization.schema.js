'use strict';
const Joi = require('joi');

const createOrgSchema = {
    name: Joi.string().required(),      
    description: Joi.string(),
    code: Joi.string().required(),
    url: Joi.string().required(),
    type: Joi.string().valid('employer', 'insurance', 'health system').required()
  };
  
module.exports = createOrgSchema; 