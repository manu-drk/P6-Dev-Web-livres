const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};


// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = (req, res, next) => {
//     try {
//         // Vérifie si l'en-tête Authorization est présent
//         if (!req.headers.authorization) {
//             throw new Error('Authentification échouée : Token manquant');
//         }
        
//         // Récupère et vérifie le token JWT
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
//         // Ajoute l'identifiant utilisateur au corps de la requête
//         req.auth = {
//             userId: decodedToken.userId
//         };

//         // Passe au prochain middleware
//         next();
//     } catch (error) {
//         res.status(401).json({ error: error.message });
//     }
// };


// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//         const userId = decodedToken.userId;
//         req.auth = {
//             userId: userId
//         };
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Authentification échouée : Token invalide' });
//     }
// };


//******************************** */
