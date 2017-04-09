import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

// rename this into any debugging string you wish to run on terminal
const debug = require('debug')('node-express-firebase:index');

/**
 * Timeline Schema
 */
const TimelineSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: { type: String, default: 'Point', required: true },
    coordinates: [Number]
  },
  user: {
    type: Object,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'common_avatar'
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    default: ['common']
  },
  tags: {
    type: [String],
    default: ['nothing']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  commentCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  },
  reportsCount: {
    type: Number,
    default: 0
  },
  comment: [{
    type: mongoose.Schema.Types.Object,
    ref: 'Comment'
  }],
  likes: [{
    type: String
  }],
  reporters: [{
    type: String
  }],
});


/**
 * Add apropriate index for fast query
 */
TimelineSchema.index({ location: '2dsphere', country: 1, city: 1 });

/**
 * Specify list of necessary value wanted to be returned to decrease JSON size
 */
const JSONReturn = 'user.uid city username avatar content category tags createdAt commentCount likesCount reportsCount';

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
    return this.findById(id, JSONReturn)
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
    return this.find({
    }, JSONReturn)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

    /**
   * List timeline in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of timeline to be skipped.
   * @param {number} limit - Limit number of timeline to be returned.
   * @returns {Promise<User[]>}
   */
  nearby({ skip = 0, limit = 50 } = {}, query) {
    debug(`The Query is ${JSON.stringify(query)}`);
    const location = query.location;
    const distance = query.distance;
    const reqCountry = query.country;
    const reqCity = query.city;
    const longlat = location.split(',');
    return this.find({
      location:
      { $near: {
        $geometry: { type: 'Point', coordinates: [longlat[0], longlat[1]] },
        $minDistance: 10,
        $maxDistance: distance || 20000 }
      },
      country: reqCountry,
      city: reqCity
    }, JSONReturn)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean() // Convert to javascript object to make it faster
      .exec();
  },


    /**
   * Create a comment by updating databases and increment it
   * @param {String} id - Id of data need to add new comment
   * @param {Object} objects - Name of Object to push
   * @returns {Promise<Timeline>}
   */
  createComment(id, objects) {
    return this.update({
      _id: id,
      comment: { $ne: objects }
    },
      {
        $inc: { commentCount: 1 },
        $push: { comment: objects }
      })
      .exec();
  },


      /**
   * Create a comment by updating databases and increment it
   * @param {String} id - Id of data need to add new comment
   * @param {Object} objects - Name of Object to push
   * @returns {Promise<Timeline>}
   */
  addLikes(id, uuid, like) {
    if (like) {
      return this.update({
        _id: id,
        likes: { $elemMatch: { $ne: uuid } }
      },
        {
          $inc: { likesCount: 1 },
          $push: { likes: uuid }
        })
      .exec();
    }

    return this.update({
      _id: id,
      likes: { $ne: uuid }
    },
      {
        $inc: { likesCount: -1 },
        $pull: { likes: uuid }
      })
      .exec();
  },

        /**
   * Create a report by updating databases and increment it
   * @param {String} id - Id of data need to add new comment
   * @param {Object} objects - Name of Object to push
   * @returns {Promise<Timeline>}
   */
  addReports(id, uuid, report) {
    if (report) {
      return this.update({
        _id: id,
        reporters: { $elemMatch: { $ne: uuid } }
      },
        {
          $inc: { reportsCount: 1 },
          $push: { reporters: uuid }
        })
      .exec();
    }

    return this.update({
      _id: id,
      likes: { $ne: uuid }
    },
      {
        $inc: { likesCount: -1 },
        $pull: { likes: uuid }
      })
      .exec();
  },

    /**
   * List timeline in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of timeline to be skipped.
   * @param {number} limit - Limit number of timeline to be returned.
   * @returns {Promise<User[]>}
   */
  listCategory({ skip = 0, limit = 50 } = {}, categoryType) {
    debug(`Category is ${categoryType}`);
    return this.find({ category: { $all: categoryType.split(',') } }, JSONReturn)
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
