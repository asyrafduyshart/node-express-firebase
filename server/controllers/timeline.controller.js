import Timeline from '../models/timeline.model';
import Comment from '../models/comment.model';
// rename this into any debugging string you wish to run on terminal
const debug = require('debug')('node-express-firebase:index');

/**
 * Load timeline and append to req.
 */
function load(req, res, next, id) {
  Timeline.get(id)
    .then((timeline) => {
      req.timeline = timeline; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
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
  const timeline = new Timeline({
    user: req.user,
    country: req.body.country,
    city: req.body.city,
    location: req.body.location,
    username: req.body.username,
    avatar: req.body.avatar,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags,
  });

  timeline.save()
    .then(savedTimeline => res.json(savedTimeline))
    .catch(e => next(e));
}

/**
 * Update existing timeline
 * @property {string} req.body.country - The country of timeline.
 * @property {string} req.body.city - The city of timeline.
 * @property {string} req.body.location - The location of timeline.
 * @property {string} req.body.category - The category of timeline.
 * @property {string} req.body.tags - The tags of timeline.
 * @property {string} req.body.username - The username of timeline.
 * @property {string} req.body.avatar - The avatar of timeline.
 * @returns {Timeline}
 */
function update(req, res, next) {
  const timeline = req.timeline;
  timeline.country = req.body.country;
  timeline.city = req.body.city;
  timeline.location = req.body.location;
  timeline.category = req.body.category;
  timeline.tags = req.body.tags;
  timeline.username = req.body.username;
  timeline.avatar = req.body.avatar;
  timeline.save()
    .then(savedTimeline => res.json(savedTimeline))
    .catch(e => next(e));
}

/**
 * Get timeline list.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @returns {Timeline[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Timeline.list({ limit, skip })
    .then(timeline => res.json(timeline))
    .catch(e => next(e));
}

/**
 * Get timeline list.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @returns {Timeline[]}
 */
function listNearby(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Timeline.nearby({ limit, skip }, req.query.location, req.query.distance)
    .then(timeline => res.send(timeline))
    .catch(e => next(e));
}

/**
 * Delete timeline.
 * @returns {Timeline}
 */
function remove(req, res, next) {
  const timeline = req.timeline;
  timeline.remove()
    .then(deletedTimeline => res.json(deletedTimeline))
    .catch(e => next(e));
}

/**
 * Sort timeline list by category.
 * @property {number} req.query.skip - Number of timeline to be skipped.
 * @property {number} req.query.limit - Limit number of timeline to be returned.
 * @property {StringArray} req.query.timeline - Limit number of timeline to be returned.

 * @returns {Timeline[]}
 */
function categoryList(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Timeline.listCategory({ limit, skip }, req.query.category)
    .then(timeline => res.json(timeline))
    .catch(e => next(e));
}

/**
 * Create new comment
 * @property {string} req.body.text - The tittle of v.
 * @property {string} req.body.author - The slug of timeline.
 * @returns {Timeline}
 */
function updateComment(req, res, next) {
  Timeline.createComment(req.timeline, new Comment({
    user: req.user,
    text: req.body.text
  }))
  .then(timeline => res.json(timeline))
    .catch(e => next(e));
}

/**
 * Add new likes
 * @property {string} req.body.text - The tittle of v.
 * @property {string} req.body.author - The slug of timeline.
 * @returns {Timeline}
 */
function addLikes(req, res, next) {
  Timeline.addLikes(req.timeline, req.user.uid, req.query.like)
  .then(timeline => res.json(timeline))
    .catch(e => next(e));
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

export default { load,
  get,
  create,
  update,
  list,
  remove,
  updateComment,
  commentList,
  categoryList,
  addLikes,
  listNearby };
