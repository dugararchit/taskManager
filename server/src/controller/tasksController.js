const logger = require('../config/logger');
const TasksModel = require('../model/tasks');
const utilities = require('../utils/utils');

module.exports = {
  createtasks: async (_req, res) => {
    logger.info(`Entered in Creating tasks`);
    const { title, description, deadline, isActive, isDone, priority } = _req.body;

    const newtasks = new TasksModel({ title, description, deadline, isActive, isDone, priority });

    try {
      await newtasks.save();
      return utilities._200Response(res, {
        message: 'tasks added successfully',
      });
    } catch (err) {
      logger.error('Errored occured', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  getAlltasks: (_req, res) => {
    try {
      const prioritySort = { priority: 1 };
      TasksModel.find({})
        .sort(prioritySort)
        .exec((err, tasks) => {
          if (err) {
            logger.error(err.message);
            return utilities._400Response(res, { error: err.message });
          }
          logger.info(`Success: All tasks fetched`);
          return utilities._200Response(res, { data: tasks });
        });
    } catch (err) {
      logger.error('Error occured during get all tasks', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  deleteAlltasks: (_req, res) => {
    try {
      TasksModel.deleteMany({}).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info(`Deleted all tasks from Mongo${response}`);
        return utilities._200Response(res, { message: 'All tasks deleted' });
      });
    } catch (err) {
      logger.error('Error occured at delete all tasks', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  /**
   *
   * @param {string} id
   */
  deletetasks: (req, res) => {
    try {
      const { _id } = req.body;
      logger.info(`Delete requested for _id: ${_id}`);
      TasksModel.findByIdAndDelete({ _id }).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info(`tasks deleted successfully${response}`);
        return utilities._200Response(res, { message: 'tasks deleted successfully' });
      });
    } catch (err) {
      logger.error('Error occured at delete tasks', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  /**
   *
   * @param {string} id
   * @param {*} key
   */
  updatetasks: (req, res) => {
    try {
      const { _id } = req.body;
      const updateData = { ...req.body };

      logger.info(`update requested for _id: ${req.body}`);
      logger.info(`update requested for updateddata: ${updateData}`);

      TasksModel.findByIdAndUpdate({ _id }, updateData, { new: true }).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info(`tasks updated successfully ${JSON.stringify(response)}`);

        return utilities._200Response(res, { message: 'Task updated successfully' });
      });
    } catch (err) {
      logger.error('Error occured at update tasks', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
};
