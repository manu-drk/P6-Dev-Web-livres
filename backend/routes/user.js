const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const validatePassword = require('../middleware/validate-password');

router.post('/signup', validatePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const userCtrl = require('../controllers/user');

// router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

// module.exports = router;