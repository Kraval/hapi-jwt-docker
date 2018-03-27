const OrgController = require('../controllers/v1/organization');
const OrgControllerV2 = require('../controllers/v2/organization');
const createOrgSchema = require('../models/organization.schema');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


module.exports = [

  {
    method: 'GET',
    path: '/',
    config: {
      handler: OrgController.hello,
      tags: ['api', 'Organization', "v1"],
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/organizations',
    config: {
      handler: OrgController.list,
      tags: ['api', 'Organization', "v1"]
    }
  },
  {
    method: 'GET',
    path: '/organizations/{filter}/{value}',
    config: {
      handler: OrgController.list,
      validate:{
        params: {
          filter: Joi.string().valid('name','code').required(),
          value:Joi.string().required()
        }
      },
      tags: ['api', 'Organization', "v1"]
    }
  },
  {
    method: 'GET',
    path: '/organizations/{id}',
    config: {
      handler: OrgController.get,
      validate:{
        params: {
          id: Joi.objectId()          
        }
      },
      tags: ['api', 'Organization', "v1"]
    }
  },
  {
    method: 'POST',
    path: '/organizations',
    config: {
      handler: OrgController.create,
      validate: {
        payload: createOrgSchema
      },
      tags: ['api', 'Organization', "v1"]
    }
  },
  {
    method: 'PUT',
    path: '/organizations/{id}',
    config: {
      handler: OrgController.update,
      validate: {
        payload: createOrgSchema
      },
      validate: {
        payload: createOrgSchema
      },
      tags: ['api', 'Organization', "v1"]
    }
  },
  {
    method: 'DELETE',
    path: '/organizations/{id}',
    config: {
      handler: OrgController.remove,
      tags: ['api', 'Organization', "v1"]
    }
  },
  //V2 Routes
  {
    method: 'GET',
    path: '/v2/organizations',
    config: {
        handler: OrgControllerV2.hello,
        tags: ['api', 'Organization', "v2"]        
    }
  },  
];