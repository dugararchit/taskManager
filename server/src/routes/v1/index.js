const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const tasksRoute = require('./tasks.route');
/* {routesPath} */
const docsRoute = require('./docs.route');

const config = require('../../config/config');

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/tasks',
    route: tasksRoute,
  },
/* {routing} */
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
