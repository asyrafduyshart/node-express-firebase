'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// rename this into any debugging string you wish to run on terminal
var debug = require('debug')('node-express-firebase:index');

/**
 * Timeline Schema
 */
var TimelineSchema = new _mongoose2.default.Schema({
  country: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    default: ['common']
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [{
    type: _mongoose2.default.Schema.Types.Object,
    ref: 'Comment'
  }]
});

/**
 * Add apropriate index for fast query
 */
TimelineSchema.index({ country: 1, city: 1 });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TimelineSchema.method({});

/**
 * Statics
 */
TimelineSchema.statics = {
  /**
   * Get timeline
   * @param {ObjectId} id - The objectId of timeline.
   * @returns {Promise<Timeline, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (timeline) {
      if (timeline) {
        return timeline;
      }
      var err = new _APIError2.default('No such timeline exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List timeline in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of timeline to be skipped.
   * @param {number} limit - Limit number of timeline to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
  },


  /**
  * List timeline in descending order of 'createdAt' timestamp.
  * @param {number} skip - Number of timeline to be skipped.
  * @param {number} limit - Limit number of timeline to be returned.
  * @returns {Promise<User[]>}
  */
  listCategory: function listCategory() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$skip = _ref2.skip,
        skip = _ref2$skip === undefined ? 0 : _ref2$skip,
        _ref2$limit = _ref2.limit,
        limit = _ref2$limit === undefined ? 50 : _ref2$limit;

    var categoryType = arguments[1];

    debug('Category is ' + categoryType);
    return this.find({ category: { $all: categoryType.split(',') } }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
  }
};

/**
 * @typedef Timeline
 */
exports.default = _mongoose2.default.model('Timeline', TimelineSchema);
module.exports = exports['default'];
//# sourceMappingURL=timeline.model.js.map
