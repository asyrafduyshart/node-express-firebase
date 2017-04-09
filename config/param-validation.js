import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      country: Joi.string().required(),
      city: Joi.string().required(),
      location: Joi.object().required(),
      displayName: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      country: Joi.string().required(),
      username: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

    // GET /api/timelies/nearby
  neabyRequest: {
    query: {
      location: Joi.string().required()
    }
  },

  // POST /api/users
  createTimeline: {
    user: {
      uid: Joi.string().required()
    },
    body: {
      country: Joi.string().required(),
      city: Joi.string().required(),
      location: Joi.object().required(),
      content: Joi.string().required(),
      username: Joi.string().required()
    }
  },

    // UPDATE /api/timelies/:timelineId
  updateTimeline: {
    body: {
      title: Joi.string().required(),
      slug: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().required()
    },
    params: {
      timelineId: Joi.string().hex().required()
    }
  },

      // UPDATE /api/timelines/:timelineId
  addComment: {
    user: {
      uid: Joi.string().required()
    },
    body: {
      text: Joi.string().required()
    },
    params: {
      timelineId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
