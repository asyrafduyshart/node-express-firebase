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

router.route('/:timelineId')
  /** GET /api/timeline/:timelineId - Get timeline */
  .get(timelineCtrl.get)

  /** PUT /api/timeline/:timelineId - Update timeline */
  .put(validate(paramValidation.updateTimeline), timelineCtrl.update)

  /** DELETE /api/timeline/:timelineId - Delete timeline */
  .delete(timelineCtrl.remove);

/** PUT /api/timeline/:timelineId/comment - Add comment timeline */
router.route('/:timelineId/comment')
  .put(validateJwt, validate(paramValidation.addComment), timelineCtrl.createComment);

router.route('/:timelineId/comment')
  .get(timelineCtrl.commentList);

/** Load timeline when API with timelineId route parameter is hit */
router.param('timelineId', timelineCtrl.load);

export default router;
