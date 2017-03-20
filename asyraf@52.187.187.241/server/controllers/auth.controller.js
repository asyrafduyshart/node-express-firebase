'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceAccount = require('../../firebaseServiceAccount.json');

// rename this into any debugging string you wish to run on terminal
var debug = require('debug')('node-express-firebase:index');

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(serviceAccount),
  databaseURL: _config2.default.firebaseUrl
});

// // sample user, used for authentication
// const user = {
//   username: 'react',
//   password: 'express'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity


  // Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
  // The Firebase ID token needs to be passed as a Bearer token:
  // `Authorization: Bearer <Firebase ID Token>`.
  // when decoded successfully, the ID Token content will be added as `req.user`.
  debug('Check if request is authorized with Firebase ID token');

  var err = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED, true);

  /**
  * Check body if ther is Firebase ID Token
  * @param req
  * @param res
  * @returns {err}
  */
  if (!req.body.token) {
    console.error('Token is not requested');
    return next(err);
  }

  var idToken = req.body.token;
  _firebaseAdmin2.default.auth().verifyIdToken(idToken).then(function (decodedIdToken) {
    debug('ID Token correctly decoded', decodedIdToken);
    next();
    var token = _jsonwebtoken2.default.sign({
      uid: decodedIdToken.uid
    }, _config2.default.jwtSecret);
    /**
     * If Success then will return jwt token with uid and email
     */
    return res.json({

      token: token });
  }).catch(function (error) {
    debug('Error while verifying Firebase ID token:', error);
    return next(err);
  });
  return err;
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

exports.default = { login: login, getRandomNumber: getRandomNumber };
module.exports = exports['default'];
//# sourceMappingURL=auth.controller.js.map
