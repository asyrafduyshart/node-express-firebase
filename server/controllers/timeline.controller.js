import Timeline from '../models/timeline.model';
import Comment from '../models/comment.model';

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
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    author: req.body.author
  });

  timeline.save()
    .then(savedTimeline => res.json(savedTimeline))
    .catch(e => next(e));
}

/**
 * Update existing timeline
 * @property {string} req.body.title - The tittle of v.
 * @property {string} req.body.slug - The slug of timeline.
 * @property {string} req.body.content - The content of timeline.
 * @property {string} req.body.author - The author of timeline.
 * @returns {Timeline}
 */
function update(req, res, next) {
  const timeline = req.timeline;
  timeline.title = req.body.title;
  timeline.slug = req.body.slug;
  timeline.content = req.body.content;
  timeline.author = req.body.author;
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
 * Create new comment
 * @property {string} req.body.text - The tittle of v.
 * @property {string} req.body.author - The slug of timeline.
 * @returns {Timeline}
 */
function createComment(req, res, next) {
  const timeline = req.timeline;
  timeline.comment.push(new Comment({
    user: req.user,
    text: req.body.text,
    author: req.body.author
  }));

  timeline.save()
    .then(savedComment => res.json(savedComment))
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

export default { load, get, create, update, list, remove, createComment, commentList };
