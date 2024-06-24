const express = require('express');
const bodyParser = require('body-parser');
const passwordValidator = require('password-validator');

const app = express();
app.use(bodyParser.json());

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

// Middleware pour valider un mot de passe
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

app.post('/register', validatePassword, (req, res) => {
    res.status(200).send('Mot de passe valide !');
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

module.exports = validatePassword;
