'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeline = require('../models/timeline.model');

var _timeline2 = _interopRequireDefault(_timeline);

var _comment = require('../models/comment.model');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// rename this into any debugging string you wish to run on terminal
var debug = require('debug')('node-express-firebase:index');

/**
 * Load timeline and append to req.
 */
function load(req, res, next, id) {
  _timeline2.default.get(id).then(function (timeline) {
    req.timeline = timeline; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get Timeline
 * @returns {Timeline}
 */
function get(req, res) {
  return res.json(req.timeline);
}

/**
 * Create new timeline
 * @property {string} req.body.title - The tittle of v.
 * @property {string} req.body.slug - The slug of timeline.
 * @property {string} req.body.content - The content of timeline.
 * @property {string} req.body.author - The author of timeline.
 * @returns {Timeline}
 */
function create(req, res, next) {
  var timeline = new _timeline2.default({
    user: req.user,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author
  });

  timeline.save().then(function (savedTimeline) {
    return res.json(savedTimeline);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing timeline
 * @property {string} req.body.title - The tittle of v.
 * @property {string} req.body.slug - The slug of timeline.
 * @property {string} req.body.content - The content of timeline.
 * @property {string} req.body.category - The category of timeline.
 * @property {string} req.body.author - The author of timeline.
 * @returns {Timeline}
 */
function update(req, res, next) {
  var timeline = req.timeline;
  timeline.title = req.body.title;
  timeline.slug = req.body.slug;
  timeline.content = req.body.content;
  timeline.category = req.body.category;
  timeline.author = req.body.author;
  timeline.save().then(function (savedTimeline) {
    return res.json(savedTimeline);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get timeline list.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @returns {Timeline[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _timeline2.default.list({ limit: limit, skip: skip }).then(function (timeline) {
    return res.json(timeline);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete timeline.
 * @returns {Timeline}
 */
function remove(req, res, next) {
  var timeline = req.timeline;
  timeline.remove().then(function (deletedTimeline) {
    return res.json(deletedTimeline);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Sort timeline list by category.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @property {StringArray} req.query.timeline - Limit number of timeline to be returned.

 * @returns {Timeline[]}
 */
function categoryList(req, res, next) {
  var _req$query2 = req.query,
      _req$query2$limit = _req$query2.limit,
      limit = _req$query2$limit === undefined ? 50 : _req$query2$limit,
      _req$query2$skip = _req$query2.skip,
      skip = _req$query2$skip === undefined ? 0 : _req$query2$skip;

  _timeline2.default.listCategory({ limit: limit, skip: skip }, req.query.category).then(function (timeline) {
    return res.json(timeline);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Create new comment
 * @property {string} req.body.text - The tittle of v.
 * @property {string} req.body.author - The slug of timeline.
 * @returns {Timeline}
 */
function createComment(req, res, next) {
  var timeline = req.timeline;
  timeline.comment.push(new _comment2.default({
    user: req.user,
    text: req.body.text,
    author: req.body.author
  }));

  timeline.save().then(function (savedComment) {
    return res.json(savedComment);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get comment in timeline list.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @returns {Comment[]}
 */
function commentList(req, res) {
  return res.json(req.timeline.comment);
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, createComment: createComment, commentList: commentList, categoryList: categoryList };
module.exports = exports['default'];
//# sourceMappingURL=timeline.controller.js.map
