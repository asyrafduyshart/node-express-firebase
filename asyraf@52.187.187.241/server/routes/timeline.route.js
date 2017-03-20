'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _timeline = require('../controllers/timeline.controller');

var _timeline2 = _interopRequireDefault(_timeline);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

var validateJwt = (0, _expressJwt2.default)({ secret: _config2.default.jwtSecret });

router.route('/')
/** GET /api/timeline - Get list of timeline */
// .get(timelineCtrl.list)
.get(validateJwt, _timeline2.default.list)

/** POST /api/timeline - Create new timeline */
.post(validateJwt, (0, _expressValidation2.default)(_paramValidation2.default.createTimeline), _timeline2.default.create);

router.route('/sort')

/** GET /api/timeline query categoryType - Get sorting timeline list of specific category */
// .get(timelineCtrl.categoryList)
.get(validateJwt, _timeline2.default.categoryList);

router.route('/:timelineId')
/** GET /api/timeline/:timelineId - Get timeline */
.get(_timeline2.default.get)

/** PUT /api/timeline/:timelineId - Update timeline */
.put((0, _expressValidation2.default)(_paramValidation2.default.updateTimeline), _timeline2.default.update)

/** DELETE /api/timeline/:timelineId - Delete timeline */
.delete(_timeline2.default.remove);

/** PUT /api/timeline/:timelineId/comment - Add comment timeline */
router.route('/:timelineId/comment').put(validateJwt, (0, _expressValidation2.default)(_paramValidation2.default.addComment), _timeline2.default.createComment);

router.route('/:timelineId/comment').get(_timeline2.default.commentList);

/** Load timeline when API with timelineId route parameter is hit */
router.param('timelineId', _timeline2.default.load);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=timeline.route.js.map
