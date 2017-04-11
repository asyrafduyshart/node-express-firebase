import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const CommentSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  avatar: {
    type: String,
    default: 'common_avatar'
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CommentSchema.method({
});

/**
 * Statics
 */
CommentSchema.statics = {
  /**
   * Get comments
   * @param {ObjectId} id - The objectId of comments.
   * @returns {Promise<Comment, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((comment) => {
        if (comment) {
          return comment;
        }
        const err = new APIError('No such commets exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of comments to be skipped.
   * @param {number} limit - Limit number of commets to be returned.
   * @returns {Promise<Comment[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Comment
 */
export default mongoose.model('Comment', CommentSchema);
