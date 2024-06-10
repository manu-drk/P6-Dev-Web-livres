const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware pour vérifier les champs requis
const validateSignupData = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }
    next();
};

exports.signup = [
    validateSignupData,
    (req, res, next) => {
        console.log('Données reçues :', req.body);

        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: email,
                    password: hash
                });
                return user.save();
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => {
                if (error.name === 'ValidationError') {
                    res.status(400).json({ error: error.message });
                } else {
                    res.status(500).json({ error });
                }
            });
    }
];

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            return bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                });
        })
        .catch(error => res.status(500).json({ error }));
};



// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user');

// exports.signup = (req, res, next) => {
//     console.log('Données reçues :', req.body);
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                 .catch(error => {
//                     if (error.name === 'ValidationError') {
//                         // Gérez les erreurs de validation ici
//                         res.status(400).json({ error: error.message });
//                     } else {
//                         res.status(500).json({ error });
//                     }
//                 });
//         //         .catch(error => res.status(400).json({ error }));
//         // })
//         // .catch(error => res.status(500).json({ error }));
//             })}

// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign(
//                             { userId: user._id },
//                             'RANDOM_TOKEN_SECRET',
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };