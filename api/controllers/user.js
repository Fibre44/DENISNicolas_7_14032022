const db = require('./../lib/models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const token = process.env.TOKEN
const envDomain = process.env.DOMAIN
const envSecure = process.env.SECURE
const fs = require('fs');
const passwordValidator = require('password-validator');


exports.signup = (req, res, next) => {

    db.User.count({
        where: {
            email: req.body.email
        }
    })
        .then((user) => {
            //Si l'email n'existe pas
            if (user == 0) {

                //On est que le champ mot de passe est confirme à la politique de sécurité
                const schema = new passwordValidator();
                schema
                    .is().min(8)                                    // Minimum length 8
                    .is().max(100)                                  // Maximum length 100
                    .has().uppercase()                              // Must have uppercase letters
                    .has().lowercase()                              // Must have lowercase letters
                    //.has().digits(2)                                // Must have at least 2 digits
                    .has().not().spaces()                           // Should not have spaces
                    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

                const testPassword = schema.validate(req.body.password)
                if (testPassword != true) {
                    res.status(403).json({ message: 'Le mode de passe ne répond pas aux critères de securité' })
                }

                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        db.User.create({
                            email: req.body.email,
                            password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            role: 'Employee',
                            picture: ''
                        })
                            .then(function (user) {
                                user.addGroupe('Groupomania', { through: { selfGranted: false } })
                                    .then((user) => {
                                        res.json({ message: "Création de l'utilisateur", userId: user.id, test: testPassword })
                                    })
                            })
                            .catch((error) => {
                                res.status(500).json({ error })
                            })
                    })
                    .catch(error => res.status(403).json({ error }));
            } else {
                res.status(403).json({ error: "L'email existe déjà dans la base" })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.login = (req, res, next) => {
    db.User.findOne({
        where: ({
            email: req.body.email
        })
    })
        .then((user) => {
            if (user) {
                const userIdDB = user.dataValues.id
                const passwordDB = user.dataValues.password
                bcrypt.compare(req.body.password, passwordDB)
                    .then(valid => {
                        if (valid) {
                            res.cookie('token', jwt.sign(
                                { userId: userIdDB },
                                token,
                                { expiresIn: '24h' }
                            ), { httpOnly: true, secure: envSecure, domain: envDomain })
                            //cookie secure passe sur false car ne fonctionne que sur HTTPS pour postman
                            res.status(200).json({
                                message: 'connexion'
                            });

                        } else {

                            return res.status(403).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
                        }

                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            } else {

                res.status(404).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' })
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })

}

exports.identity = (req, res, next) => {

    db.User.findOne({
        attributes: ['id', 'firstname', 'lastname', 'role'],

        where: {
            id: req.userId
        }
    })
        .then((user) => {
            res.status(200).json({ user })
        })
        .catch((errror) => {
            res.status(404).json({ message: 'La ressource n existe pas' })
        })
}

exports.delete = (req, res, next) => {

    db.Message.findAll({
        where: {
            userId: req.userId
        }
    }).then((messages) => {

        if (messages) {
            //Etape 1 on supprime les messages de l'utilisateur avec ses commentaires
            messages.forEach(message =>
                fs.unlink(`upload/${message.imageUrl}`, () => {
                    //On supprime les commentaires problème avec la gestion de la cascade de suppression de l'ORM
                    db.Comment.destroy({
                        where: {
                            messageId: message.id
                        }
                    }).then(() => {
                        db.Message.destroy({
                            where: {
                                id: message.id
                            }
                        })
                    })
                })
            )//Fin de la boucle forEach
            //Etape 2 on supprime les commentaires de l'utilisteur
            db.Comment.destroy({
                where: {
                    userId: req.userId
                }
            }).then(() => {
                //Etape 3 on supprime les likes de l'utilisateur
                db.Like.destroy({
                    where: {
                        userId: req.userId
                    }
                })
            }).then(() => {
                //Etape 4 on récupére la liste des groupes de l'utilisateur et on supprime les affectations
                db.User.findOne({
                    where: {
                        id: req.userId
                    }
                }).then((user) => {
                    user.getGroupes()
                        .then((groupes) => {
                            groupes.forEach(groupe =>
                                groupe.removeUser(req.userId, { through: { selfGranted: false } })
                            )
                        }).then(() => {
                            //Etape 5 on supprime l'utilisteur
                            db.User.destroy({
                                where: {
                                    id: req.userId
                                }
                            }).then(() => {
                                res.status(200).json({ message: 'Suppression de l utilisateur' })
                            })
                        }).catch((error) => {
                            res.status(500).json({ error })
                        })
                })
            })


        } else {
            res.status(500).json({ message: 'Erreur de récupération des messages' })
        }
    }).catch((errror) => {
        res.status(500).json({ errror })

    })

}

exports.updatPassword = (req, res, next) => {

    db.User.findOne({
        where: {
            id: req.userId
        }
    })
        .then((user) => {
            if (user) {
                //on verifie le mot de passe avant la MAJ
                const passwordDB = user.dataValues.password
                bcrypt.compare(req.body.password, passwordDB)
                    .then(valid => {
                        if (valid) {
                            bcrypt.hash(req.body.newPassword, 10)
                                .then(hash => {
                                    db.User.update(
                                        { password: hash },
                                        {
                                            where:
                                                { id: req.userId }
                                        }
                                    )
                                        .then(function (user) {
                                            res.status(200).json({ message: "Mise à jour du password", userId: user.id })
                                        })
                                        .catch((error) => {
                                            res.status(500).json({ error })
                                        })
                                })
                        } else {
                            return res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
                        }
                    })
            } else {
                res.status(400).json({ message: 'Il manque le password' })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur serveur ", error })
        })
}
exports.logout = (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        domain: envDomain
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}
exports.picture = (req, res, next) => {
    if (req.file) {
        db.User.update(
            { pictureUrl: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}` }, {
            where: {
                id: req.userId
            }
        }
        ).then(() => {
            res.status(200).json({ message: 'Mise à jour de la photo de profil' })
        }).catch((error) => {
            res.status(500).json({ error })
        })
    } else {
        res.status(400).json({ message: 'Il manque l image' })
    }


}

exports.getPicture = (req, res, next) => {
    db.User.findOne({
        attributes: ['pictureUrl'],
        where: {
            id: req.userId
        }
    }).then((picture) => {

        res.status(200).json({ picture })
    })
}

exports.getAllPictures = (req, res, next) => {
    db.User.findAll({
        attributes: ['id', 'pictureUrl'],
    }).then((pictures) => {

        res.status(200).json({ pictures })
    })
}