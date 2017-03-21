import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add apropriate index for fast query
 */
UserSchema.index({ country: 1, city: 1 });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  checkUser(uuid) {
    return this.find({ user: uuid }, (err, docs) => {
      if (!docs.length) {
        return true;
      }
      return new APIError('No such user exists!', httpStatus.NOT_FOUND);
    });
  }

};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
