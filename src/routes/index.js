const orgRoutes = require('./organization.routes');
const accountRoutes = require('./account.routes');

module.exports = [].concat(orgRoutes,accountRoutes);