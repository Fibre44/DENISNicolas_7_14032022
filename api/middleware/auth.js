const jwt = require('jsonwebtoken');
const db = require('./../lib/models/index.js');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = { userId };

    db.User.findAll({
      attributes: ['id'],
      where: {
        id: userId
      }
    }).then((user) => {

      if (user != []) {
        /* On passe l'utilisateur dans la requete afin que celui-ci soit disponible pour les prochains middlewares */
        req.userId = userId
        next();

      } else {
        throw 'Invalid user ID';
      }

    })
      //Erreur le where ne trouve rien
      .catch((error) => {
        res.status(500).json({ message: 'Erreur de connexion à la base' })
      })

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      message: 'Token non valide ',

    });
  }
};