const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.get('/:id', typeController.getOne);
router.delete(
  '/:id',
  authMiddleware,
  checkRole('ADMIN'),
  typeController.delete
);
router.patch('/:id', authMiddleware, checkRole('ADMIN'), typeController.patch);

module.exports = router;
