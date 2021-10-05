const UserModel = require('../model/user');
const utilities = require('../utils/utils');
const constant = require('../utils/constant.json');
const logger = require('../config/logger');

/**
 *
 * @param {string} email
 * @param {string} password
 */
const loginUser = async (req, res) => {
  try {
    logger.info('Request Initiated @ Login function\n');

    const { email, password } = req.body;
    logger.info(`Email: ${email}\n`);

    const user = await UserModel.findOne({ email });
    if (!user) return utilities._400Response(res, { message: constant.response_messages.user_does_not_exists });

    const validatePassword = await user.validatePassword(password);

    if (!validatePassword) {
      logger.info('Incorrect password', password, user.password);
      return utilities._400Response(res, { message: constant.response_messages.incorrect_password });
    }

    const { accessToken } = await utilities.generateToken({
      _id: user._id,
    });

    logger.info(`accessToken => ${accessToken} \n`);

    return utilities._200Response(res, { data: { accessToken } });
  } catch (e) {
    logger.info('Error caught @ loginUser controller: ', e);
    return utilities._400Response(res, { message: constant.response_messages.something_went_wrong });
  }
};

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
const signupUser = async (req, res) => {
  logger.info(`Entered in Sign up user`);
  const { name, email, password } = req.body;

  const userExist = await UserModel.findOne({ email });
  if (userExist) return utilities._400Response(res, { message: constant.response_messages.user_exists });

  const newUser = new UserModel({
    name,
    email,
    password,
  });

  try {
    const savedUser = await newUser.save();
    const { accessToken } = await utilities.generateToken({
      _id: savedUser._id,
    });

    return utilities._200Response(res, {
      data: {
        accessToken,
        message: constant.response_messages.new_user_success,
      },
    });
  } catch (err) {
    logger.error('Errored occured', err);
    return utilities._400Response(res, { error: err.message });
  }
};

module.exports = { loginUser, signupUser };
