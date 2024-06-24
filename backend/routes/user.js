const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const userCtrl = require('../controllers/user');


// Configuration du rate limit pour les tentatives de connexion (login)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite chaque IP à 5 requêtes par windowMs
    message: 'Trop de tentatives de connexion depuis cette IP, veuillez réessayer plus tard.'
});

// Route pour l'inscription
router.post('/signup', userCtrl.signup);

// Route pour la connexion avec application du rate limit
router.post('/login', loginLimiter, userCtrl.login);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const userCtrl = require('../controllers/user');

// router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

// module.exports = router;