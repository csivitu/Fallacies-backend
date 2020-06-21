const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');
const User = require('../models/User');
const Questions = require('../models/Questions');

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'));

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [User, Questions],
  rootPath: '/admin',
  branding: {
    companyName: 'CSI-VIT Fallacies',
  },
});


// Build and use a router which will handle all AdminBro routes

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS,
  cookiePassword: 'a-sample-password',
});

// const router = AdminBroExpressjs.buildRouter(adminBro);


// router.use(formidableMiddleware());
router.use(adminBro.options.rootPath, router);

module.exports = router;
