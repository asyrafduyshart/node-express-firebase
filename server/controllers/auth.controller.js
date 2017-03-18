import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';

const serviceAccount = require('../../firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://persona-973.firebaseio.com'
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
  console.log('Check if request is authorized with Firebase ID token');

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);

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

  const idToken = req.body.token;
  admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    console.log('ID Token correctly decoded', decodedIdToken);
    next();
    const token = jwt.sign({
      uid: decodedIdToken.uid,
      email: decodedIdToken.email
    }, config.jwtSecret);
    /**
     * If Success then will return jwt token with uid and email
     */
    return res.json({

      token, //This is a token that sign from the server

    });
  }).catch((error) => {
    console.error('Error while verifying Firebase ID token:', error);
    return next(err);
  });
  return (err);
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

export default { login, getRandomNumber };
