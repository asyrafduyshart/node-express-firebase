import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Timeline Schema
 */
const TimelineSchema = new mongoose.Schema({
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
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [{
    type: mongoose.Schema.Types.Object,
    ref: 'Comment'
  }]
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
TimelineSchema.method({
});

/**
 * Statics
 */
TimelineSchema.statics = {
  /**
   * Get timeline
   * @param {ObjectId} id - The objectId of timeline.
   * @returns {Promise<Timeline, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((timeline) => {
        if (timeline) {
          return timeline;
        }
        const err = new APIError('No such timeline exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List timeline in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of timeline to be skipped.
   * @param {number} limit - Limit number of timeline to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

};

/**
 * @typedef Timeline
 */
export default mongoose.model('Timeline', TimelineSchema);
