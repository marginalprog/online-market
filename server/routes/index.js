const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const cartRouter = require('./cartRouter');
const ratingRouter = require('./ratingRouter');

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Успешный ответ
 */

router.use('/user', userRouter);

/**
 * @swagger
 * /api/v1/type:
 *   get:
 *     summary: Получить все типы
 *     tags: [Type]
 *     responses:
 *       200:
 *         description: Успешный ответ
 */

router.use('/type', typeRouter);

/**
 * @swagger
 * /api/v1/brand:
 *   get:
 *     summary: Получить все бренды
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: Успешный ответ
 */

router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/cart', cartRouter);
router.use('/rating', ratingRouter);

module.exports = router;
