import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';


const router = express.Router(); // eslint-disable-line new-cap

const validateJwt = expressJwt({ secret: config.jwtSecret });


router.route('/')
  /** GET /api/users - Get list of users */
  // .get(userCtrl.list)
  .get(expressJwt({ secret: config.jwtSecret }), userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validateJwt, validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validateJwt, validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
