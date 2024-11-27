const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, checkRole(['ADMIN']), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete(
  '/:id',
  authMiddleware,
  checkRole(['ADMIN']),
  deviceController.delete
);
router.patch(
  '/:id',
  authMiddleware,
  checkRole(['ADMIN']),
  deviceController.patch
);

module.exports = router;
