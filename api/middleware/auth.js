const jwt = require('jsonwebtoken');
const db = require('./../lib/models/index.js');
const env = require('dotenv').config()
const tokenP = process.env.TOKEN

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, tokenP);
    const userId = decodedToken.userId;
    req.auth = { userId };

    db.User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    }).then((user) => {

      if (user) {

        /* On passe l'utilisateur dans la requete afin que celui-ci soit disponible pour les prochains middlewares */
        req.userId = userId
        next();

      } else {
        throw 'Invalid user ID';
      }

    })
      //Erreur le where ne trouve rien
      .catch((error) => {
        res.status(500).json({ message: 'token non valide' })
      })

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      message: 'Token non valide ',

    });
  }
};