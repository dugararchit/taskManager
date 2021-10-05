const logger = require('../config/logger');
const UserModel = require('../model/user');
const utilities = require('../utils/utils');
const constant = require('../utils/constant.json');

module.exports = {
  getAllUsers: (_req, res) => {
    try {
      UserModel.find({}).exec((err, users) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info(`Success: All users fetched`);
        return utilities._200Response(
          res,
          users.map((user) => {
            return {
              _id: user._id,
              name: user.name,
              email: user.email,
            };
          })
        );
      });
    } catch (err) {
      logger.error('Error occured during get all user', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  deleteAllUsers: (_req, res) => {
    try {
      UserModel.deleteMany({}).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info('Deleted all users from Mongo', response);
        return utilities._200Response(res, { data: constant.response_messages.delete_all_user });
      });
    } catch (err) {
      logger.error('Error occured at delete all users', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  /**
   *
   * @param {string} id
   */
  deleteUser: (req, res) => {
    try {
      const { _id } = req.body;
      logger.info('Delete requested for _id: ', _id);
      UserModel.findByIdAndDelete({ _id }).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info('User deleted successfully', response);
        return utilities._200Response(res, { data: constant.response_messages.delete_user });
      });
    } catch (err) {
      logger.error('Error occured at delete user', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
  /**
   *
   * @param {string} id
   * @param {*} key
   */
  updateUser: (req, res) => {
    try {
      const { _id } = req.body;
      const updateData = { ...req.body };
      delete updateData._id;
      logger.info('update requested for _id: ', req.body);
      logger.info('update requested for email: ', updateData);

      UserModel.findByIdAndUpdate({ _id }, updateData, { new: true }).exec((err, response) => {
        if (err) {
          logger.error(err.message);
          return utilities._400Response(res, { error: err.message });
        }
        logger.info('User updated successfully', response);

        return utilities._200Response(res, { data: constant.response_messages.update_user });
      });
    } catch (err) {
      logger.error('Error occured at update user', err);
      return utilities._400Response(res, { error: err.message });
    }
  },
};
