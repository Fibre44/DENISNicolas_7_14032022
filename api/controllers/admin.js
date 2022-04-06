const db = require('./../lib/models/index.js');

exports.home = (req, res, next) => {
    res.status(200).json({ message: 'Bienvenue sur l espace admin' })
}