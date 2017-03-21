import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import timelineCtrl from '../controllers/timeline.controller';
import config from '../../config/config';


const router = express.Router(); // eslint-disable-line new-cap

const validateJwt = expressJwt({ secret: config.jwtSecret });

router.route('/')
  /** GET /api/timeline - Get list of timeline */
  // .get(timelineCtrl.list)
  .get(validateJwt, timelineCtrl.list)

  /** POST /api/timeline - Create new timeline */
  .post(validateJwt, validate(paramValidation.createTimeline), timelineCtrl.create);

router.route('/nearby')
  /** GET /api/timeline/nearby - Get nearby from user location of timeline */
  // .get(timelineCtrl.listNearby)
 .get(validateJwt, validate(paramValidation.neabyRequest), timelineCtrl.listNearby);

router.route('/sort')

  /** GET /api/timeline query categoryType - Get sorting timeline list of specific category */
  // .get(timelineCtrl.categoryList)
  .get(validateJwt, timelineCtrl.categoryList);

router.route('/:timelineId')
  /** GET /api/timeline/:timelineId - Get timeline */
  .get(validateJwt, timelineCtrl.get)

  /** PUT /api/timeline/:timelineId - Update timeline */
  .put(validateJwt, validate(paramValidation.updateTimeline), timelineCtrl.update)

  /** DELETE /api/timeline/:timelineId - Delete timeline */
  .delete(validateJwt, timelineCtrl.remove);

/** PUT /api/timeline/:timelineId/comment - Add comment timeline */
router.route('/:timelineId/comment')
  .put(validateJwt, validate(paramValidation.addComment), timelineCtrl.updateComment);

router.route('/:timelineId/like')
    /** PUT /api/timeline/:timelineId - Update timeline */
  .put(validateJwt, timelineCtrl.addLikes);

router.route('/:timelineId/comment')
  .get(validateJwt, timelineCtrl.commentList);


/** Load timeline when API with timelineId route parameter is hit */
router.param('timelineId', timelineCtrl.load);

export default router;
