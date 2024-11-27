const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getOne);
router.delete(
  '/:id',
  authMiddleware,
  checkRole('ADMIN'),
  brandController.delete
);
router.patch('/:id', authMiddleware, checkRole('ADMIN'), brandController.patch);

module.exports = router;
