import Comment from '../models/comment.model';

/**
 * Load comment and append to req.
 */
function load(req, res, next, id) {
  Comment.get(id)
    .then((comment) => {
      req.comment = comment; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
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
  const comment = new Comment({
    text: req.body.text,
    author: req.body.author,
  });

  comment.save()
    .then(savedComment => res.json(savedComment))
    .catch(e => next(e));
}

/**
 * Update existing comment
 * @property {string} req.body.text - The text of comment.
 * @property {string} req.body.author - The author of comment.
 * @returns {Comment}
 */
function update(req, res, next) {
  const comment = req.comment;
  comment.text = req.body.text;
  comment.author = req.body.author;
  comment.save()
    .then(savedComment => res.json(savedComment))
    .catch(e => next(e));
}

/**
 * Get comment list.
 * @property {number} req.query.skip - Number of comment to be skipped.
 * @property {number} req.query.limit - Limit number of comment to be returned.
 * @returns {Comment[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Comment.list({ limit, skip })
    .then(comment => res.json(comment))
    .catch(e => next(e));
}

/**
 * Delete comment.
 * @returns {Comment}
 */
function remove(req, res, next) {
  const comment = req.comment;
  comment.remove()
    .then(deletedComment => res.json(deletedComment))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
