/**
 * Created By: Archit
 * Authentication Route
 */
const router = require('express').Router();
const userController = require('../../controller/userController');
const utils = require('../../utils/utils');

const { getAllUsers, deleteAllUsers, deleteUser, updateUser } = userController;
router.use(utils.verifyToken);

router.get('/getUsers', getAllUsers);
router.delete('/deleteAllUsers', deleteAllUsers);
router.delete('/deleteUser', deleteUser);
router.post('/updateUser', updateUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 
 * /users/getUsers:
 *   get:
 *     summary: Get all users
 *     description: It will retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK

 * /users/deleteAllUsers:
 *   delete:
 *     summary: Delete all users
 *     description: It will delete all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 * /users/deleteUser:
 *   delete:
 *     summary: Delete the specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Unique id sent
 *     responses:
 *       "200":
 *         description: User delete successfully
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *
 * /users/updateUser:
 *   post:
 *     summary: Update the specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Unique id sent
 *     responses:
 *       "200":
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 */
