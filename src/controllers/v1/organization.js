const Org = require('../../models/Organization');
const Boom = require('boom');
const Joi = require('joi');
/**
 * Hello Method
 */
exports.hello = (req, h) => {
  return { message: 'Hello from Hapi' };
}

/**
 * List Organizations
 */
exports.list = (req, h) => {
  
  //Support GET filters by Code or Name of the organization
  if (req.params.filter) {
    const { filter, value } = req.params;   
    if(!filter || !value){
      return Boom.badRequest("Missing one or more filter criteria");
    }
    var query = {};
    query[filter] = new RegExp(value, 'i');
    return Org.find(query).exec().then((orgs) => {
      return { organizations: orgs };
    }).catch((err) => {
      return { err: err };
    });
  }
  //If no filters supplied, return all available
  else {
    return Org.find({}, ['name', 'description', 'type']).exec().then((orgs) => {
      return { organizations: orgs };
    }).catch((err) => {
      return { err: err };
    });
  }
}

/**
 * Get Organization by ID
 */
exports.get = (req, h) => {
  return Org.findById(req.params.id, ['name', 'description', 'type']).exec().then((org) => {
    if (!org) return { message: 'Organization not Found' };
    return { organization: org };
  }).catch((err) => {
    return { err: err };
  });
}


/**
 * POST an Organization
 */
exports.create = (req, h) => {

  const orgData = {
    name: req.payload.name,
    description: req.payload.description,
    code: req.payload.code,
    url: req.payload.url,
    type: req.payload.type,
  };
 
  return Org.create(orgData).then((org) => {
    return { message: "Organization created successfully", organization: org };
  }).catch((err) => {
    //Log Error    
    return Boom.badImplementation("Error creating organization");
  });

}

/**
 * PUT | Update Organization by ID
 */
exports.update = (req, h) => {

  return Org.findById(req.params.id).exec().then((org) => {
    if (!org) return Boom.notFound('Organization not found');
    org.name = req.payload.name;
    org.description = req.payload.description;
    org.code = req.payload.code;
    org.url = req.payload.url;
    org.type = req.payload.type;
    org.save();
  }).then((data) => {
    return { message: "Organization data updated successfully" };
  }).catch((err) => {
    return Boom.badImplementation("Error updating organization");
  });
}

/**
 * Delete Organization by ID
 */
exports.remove = (req, h) => {
  return Org.findById(req.params.id).exec().then((org) => {
    if (!org) return  Boom.notFound('Organization not found');
    org.remove();
  }).then((data) => {
    return { message: "Organization deleted successfully" };
  }).catch((err) => {
    return Boom.badImplementation("Error deleting organization");
  });
}