'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _timeline = require('./timeline.route');

var _timeline2 = _interopRequireDefault(_timeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount user routes at /users
router.use('/users', _user2.default);

// mount auth routes at /auth
router.use('/auth', _auth2.default);

// mount timeline routes at /timeline
router.use('/timelines', _timeline2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.route.js.map
