/**
 * Created By: Archit
 */
const router = require('express').Router();
const tasksController = require('../../controller/tasksController');
const utils = require('../../utils/utils');

const { createtasks, getAlltasks, deleteAlltasks, deletetasks, updatetasks } = tasksController;

router.use(utils.verifyToken);

router.post('/createtasks', createtasks);
router.get('/gettasks', getAlltasks);
router.delete('/deleteAlltasks', deleteAlltasks);
router.delete('/deletetasks', deletetasks);
router.post('/updatetasks', updatetasks);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: tasks
 *   description: tasks management and retrieval
 */

/**
 * @swagger
 * /tasks/createtasks:
 *   post:
 *     summary: creating tasks
 *     tags: [tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - deadline
 *             properties:
 *               title:
 *                 type: 
 *               description:
 *                 type: 
 *               deadline:
 *                 type: 
 *             example:
 *               title: Exampletitle
 *               description: Exampledescription
 *               deadline: Exampledeadline

 *     responses:
 *       "200":
 *         description: tasks Created
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
 *                      "message": "New tasks added successfully!"
 *
 *
 * /tasks/gettasks:
 *   get:
 *     summary: Get all tasks
 *     description: It will retrieve all tasks
 *     tags: [tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK

 * /tasks/deleteAlltasks:
 *   delete:
 *     summary: Delete all tasks
 *     description: It will delete all tasks
 *     tags: [tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 * /tasks/deletetasks:
 *   delete:
 *     summary: Delete the specific tasks
 *     tags: [tasks]
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
 *         description: tasks delete successfully
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *
 * /tasks/updatetasks:
 *   post:
 *     summary: Update the specific tasks
 *     tags: [tasks]
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
 *         description: tasks updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 */
