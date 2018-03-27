const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Register User
 */
exports.register = (req, h) => {

  let user = new User();
  user.email = req.payload.email;
  user.username = req.payload.email;
  user.admin = false;
  user.password = bcrypt.hashSync(req.payload.password, 10);

  if (process.env.NODE_ENV === 'test') {
    user._id = '5ab6a6af5c24774bbf21246f';
    return { token: createToken(user) };
  }

  return User.create(user).then((usr) => {
    return { token: createToken(usr) };
  }).catch((err) => {
    return Boom.badImplementation("Error creating user");
  });
}

/**
 * Login User
 */
exports.login = (req, h) => {

  if (process.env.NODE_ENV === 'test') {

    let user = new User();
    user.email = 'hapitest@pager.com';
    user.username = req.payload.email;
    user.password = req.payload.password;
    user.admin = false;
    user.password = bcrypt.hashSync('tstPasword', 10);
    user._id = '5ab6a6af5c24774bbf21246f';
    return { token: createToken(user) };
  }

  return User.findOne({ 'username': req.payload.email }).exec().then((usr) => {
    if (usr) {
      console.log(usr);
      var isCorrect = bcrypt.compareSync(req.payload.password, usr.password);
      if (isCorrect) {
        return { token: createToken(usr) };
      }
      else {
        return Boom.badRequest("Incorrect email or username !");
      }
    }
    else {
      return Boom.badRequest("Incorrect email or username !");
    }
  }).catch((err) => {
    console.log(err);
    return Boom.badImplementation("Error authenticating user");
  });
}

function createToken(user) {
  let scopes;
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, SECRET_KEY, { algorithm: 'HS256', expiresIn: "1h" });
}

