const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
// const checkRole = require('../middleware/checkRoleMiddleware');

// router.post('/', authMiddleware, cartController.create);
router.get('/', authMiddleware, cartController.getCart);
router.delete('/', authMiddleware, cartController.clearCart);
router.post('/devices', authMiddleware, cartController.addDevice);
router.delete(
  '/devices/:cartDeviceId',
  authMiddleware,
  cartController.removeDevice
);

module.exports = router;
