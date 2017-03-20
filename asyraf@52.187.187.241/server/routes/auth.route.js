'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(_auth2.default.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number').get((0, _expressJwt2.default)({ secret: _config2.default.jwtSecret }), _auth2.default.getRandomNumber);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=auth.route.js.map
