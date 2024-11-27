const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingController.create);
router.get(
  '/users/:userId/reviews',
  authMiddleware,
  ratingController.getUserReviews
);
router.get(
  '/devices/:deviceId/reviews',
  authMiddleware,
  ratingController.getDeviceReviews
);
router.delete(
  '/:ratingId',
  authMiddleware,
  checkRole(['ADMIN', 'USER']),
  ratingController.delete
);
router.patch('/:ratingId', authMiddleware, ratingController.patch);

module.exports = router;
