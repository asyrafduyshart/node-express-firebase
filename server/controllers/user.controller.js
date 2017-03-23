import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';

// rename this into any debugging string you wish to run on terminal
const debug = require('debug')('node-express-firebase:index'); // eslint-disable-line
const error = new APIError('No such timeline exists!', httpStatus.NOT_FOUND);


/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * Check if user exist or not
 * if doesn't exist just create new One
 * if Exist just show it
 * @property {string} req.body.user - The user firebase data from jwt of user.
 * @property {string} req.body.country - The country of user.
 * @property {string} req.body.city - The username of user.
 * @property {string} req.body.username - The country of user.
 * if User exist
 * @returns {User}
 */
function create(req, res, next) {
  // const exist = User.checkUser(req.user);
  User.count({ user: req.user }, (err, count) => {
    if (err) {
      return new APIError('No such user exists!', httpStatus.NOT_FOUND);
    }

    debug(`Result is  ${count}`);
    if (count > 0) {
        // document exists });
      User.findOne({ user: req.user, }, (er, user) => {
        if (er) error();
        debug(`User exist, just show it ${user}`);
        res.json(user);
      });
    } else {
      debug(`User not exist, create new user ${req.user}`);
      const newuser = new User({
        user: req.user,
        country: req.body.country,
        city: req.body.city,
        username: req.body.username
      });
      newuser.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
    }
    return new APIError('No such user exists!', httpStatus.NOT_FOUND);
  });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const updateUser = req.user;
  updateUser.username = req.body.username;
  updateUser.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
