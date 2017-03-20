'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comment = require('../models/comment.model');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load comment and append to req.
 */
function load(req, res, next, id) {
  _comment2.default.get(id).then(function (comment) {
    req.comment = comment; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get comment
 * @returns {Comment}
 */
function get(req, res) {
  return res.json(req.comment);
}

/**
 * Create new comment
 * @property {string} req.body.text - The text of comment.
 * @property {string} req.body.author - The author of comment.
 * @returns {Comment}
 */
function create(req, res, next) {
  var comment = new _comment2.default({
    text: req.body.text,
    author: req.body.author
  });

  comment.save().then(function (savedComment) {
    return res.json(savedComment);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing comment
 * @property {string} req.body.text - The text of comment.
 * @property {string} req.body.author - The author of comment.
 * @returns {Comment}
 */
function update(req, res, next) {
  var comment = req.comment;
  comment.text = req.body.text;
  comment.author = req.body.author;
  comment.save().then(function (savedComment) {
    return res.json(savedComment);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get comment list.
 * @property {number} req.query.skip - Number of comment to be skipped.
 * @property {number} req.query.limit - Limit number of comment to be returned.
 * @returns {Comment[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _comment2.default.list({ limit: limit, skip: skip }).then(function (comment) {
    return res.json(comment);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete comment.
 * @returns {Comment}
 */
function remove(req, res, next) {
  var comment = req.comment;
  comment.remove().then(function (deletedComment) {
    return res.json(deletedComment);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
module.exports = exports['default'];
//# sourceMappingURL=comment.controller.js.map
