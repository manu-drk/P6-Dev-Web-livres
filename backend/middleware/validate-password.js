// const passwordValidator = require('password-validator');

// // Créer un schema pour le validateur de mot de passe
// const schema = new passwordValidator();

// // Définir les règles pour le mot de passe
// schema
//     .is().min(8)                                    // Minimum 8 caractères
//     .is().max(100)                                  // Maximum 100 caractères
//     .has().uppercase()                              // Doit avoir au moins une lettre majuscule
//     .has().lowercase()                              // Doit avoir au moins une lettre minuscule
//     .has().digits()                                 // Doit avoir au moins un chiffre
//     .has().not().spaces();                          // Ne doit pas contenir d'espaces

// // Middleware pour valider un mot de passe
// const validatePassword = (req, res, next) => {
//     const { password } = req.body;

//     // Vérifier si le mot de passe respecte le schema défini
//     if (!schema.validate(password)) {
//         let errors = [];

//         // Vérifier chaque règle pour le mot de passe
//         if (!schema.is().min(8)) {
//             errors.push('Le mot de passe doit contenir au moins 8 caractères.');
//         }
//         if (!schema.has().uppercase()) {
//             errors.push('Le mot de passe doit contenir au moins une lettre majuscule.');
//         }
//         if (!schema.has().lowercase()) {
//             errors.push('Le mot de passe doit contenir au moins une lettre minuscule.');
//         }
//         if (!schema.has().digits()) {
//             errors.push('Le mot de passe doit contenir au moins un chiffre.');
//         }
//         if (!schema.has().not().spaces()) {
//             errors.push('Le mot de passe ne doit pas contenir d\'espaces.');
//         }

//         return res.status(400).json({
//             error: 'Le mot de passe ne respecte pas les critères de sécurité.',
//             details: errors
//         });
//     }
//     next();
// };

// module.exports = validatePassword;


const passwordValidator = require('password-validator');

// Créer un schema pour le validateur de mot de passe
const schema = new passwordValidator();

// Définir les règles pour le mot de passe
schema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase()                              // Doit avoir au moins une lettre majuscule
    .has().lowercase()                              // Doit avoir au moins une lettre minuscule
    .has().digits()                                 // Doit avoir au moins un chiffre
    .has().not().spaces();                          // Ne doit pas contenir d'espaces

// // Middleware pour valider un mot de passe
const validatePassword = (req, res, next) => {
    const { password } = req.body;

    // Vérifier si le mot de passe respecte le schema défini
    if (!schema.validate(password)) {
        return res.status(400).json({
            error: 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et ne doit pas contenir d\'espaces.'
        });
    }
    next();
};

module.exports = validatePassword;
