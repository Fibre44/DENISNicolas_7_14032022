const jwt = require('jsonwebtoken');
const db = require('./../lib/models/index.js');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = { userId };

    db.User.findAll({
      where: {
        id: userId
      }
    }).then((user) => {
      const userId = user[0].dataValues.id

      // Si l'utilisateur dans le token = le user de l'URL alors on continue
      if (userId == req.params.id) {
        next();

        //Si l'id dans le token dans est différent de l'id dans l'url alors token non valide

      } else {
        throw 'Invalid user ID';

      }
    })
      //Erreur le where ne trouve rien
      .catch((error) => {
        res.status(403).json({ message: 'Token non valide' })
      })

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      message: 'L utilisateur n existe pas '
    });
  }
};