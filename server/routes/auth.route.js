import express from 'express';
import expressJwt from 'express-jwt';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct firebase token is provided */
router.route('/login')
  .post(authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

export default router;
