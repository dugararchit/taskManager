/**
 * Created By: Archit
 * Authentication Route
 */
const router = require('express').Router();
const authController = require('../../controller/authController');

const { loginUser, signupUser } = authController;

router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Singup user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               name: Archit
 *               email: archit.dugar@thepsi.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: User Created
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      message:
 *                          type: string
 *                  example:
 *                      "id": "6137683a1fd0b4ad3c5cf2a1"
 *                      "message": "New user added successfully!"
 *
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               email: archit.dugar@thepsi.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: User logged in with below login details
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      message:
 *                          type: string
 *                  example:
 *                      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *                      "tokenRefresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 */
