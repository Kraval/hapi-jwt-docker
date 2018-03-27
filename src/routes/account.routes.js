const AccountController = require('../controllers/v1/account');
const createUserSchema = require('../models/user.schema');

module.exports = [
{
    method: 'POST',
    path: '/account/register',
    config: {
        handler: AccountController.register,
        validate:{      
            payload: createUserSchema
        },
        tags: ['api', 'Account', "v1"],
        auth:false
    }
},

{
    method: 'POST',
    path: '/account/login',
    config: {
        handler: AccountController.login,
        validate:{      
            payload: createUserSchema
        },
        tags: ['api', 'Account', "v1"],
        auth:false
    }
}
];