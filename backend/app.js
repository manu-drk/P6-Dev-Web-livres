const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const app = express();


mongoose.connect(
    'mongodb+srv://manudossantos06:sNzqPNrysirXRTPU@clusterp6.eeylxga.mongodb.net/',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    // .catch(() => console.log('Connexion à MongoDB échouée !'));
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });



app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
