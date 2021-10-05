const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

module.exports = {
  /**
   *
   * @param {*} key
   */
  generateToken: (key) => {
    logger.info(`Key value is ${JSON.stringify(key)}\n`);
    return new Promise((resolve, reject) => {
      logger.info(process.env);
      try {
        const token = {
          accessToken: jwt.sign(key, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '15m',
          }),
        };

        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  },
  verifyToken: async (req, res, next) => {
    logger.info(`AccessToken verification process started at verifyToken function\n`);
    try {
      logger.info(`${JSON.stringify(req.headers)}\n`);

      logger.info(`req.headers["authorization"] => ${req.headers.authorization}`);

      let token = req.headers.authorization;

      if (!token) return res.status(403).json({ message: 'Please provide authorization token' });

      logger.info(JSON.stringify(req.body));

      // eslint-disable-next-line prefer-destructuring
      token = token.split(' ')[1];

      logger.info(`Token is ${token}\n`);

      jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, user) => {
        logger.info(`User ${JSON.stringify(user)}`);
        if (user) {
          logger.info('JWT Token verification success');

          req.user = user;
          next();
        } else if (err.message === 'jwt expired') {
          logger.info(`\n\n\nToken expired error caught -> ${err.message}\n\n\n`);

          return res.status(403).json({
            success: false,
            message: 'Access token expired',
          });
        } else {
          logger.info(err);
          return res.status(403).json({ err, message: 'user not authenticated' });
        }
      });
    } catch (e) {
      logger.info('Error caught: ', e);
    }
  },
  _200Response: (res, data) => {
    res.status(200).json({ success: true, ...data });
  },
  _400Response: (res, data) => {
    res.status(400).send(data);
  },
  _otherResponse: (res, statusCode, data) => {
    res.status(statusCode).send(data);
  },
};
