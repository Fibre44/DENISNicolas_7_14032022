const db = require('./../lib/models/index.js');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {

    db.User.count({
        where: {
            email: req.body.email
        }
    })
        .then((user) => {

            //Si l'email n'existe pas
            if (user == 0) {

                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        db.User.create({
                            email: req.body.email,
                            password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            role: 'Employee'
                        })
                            .then(function (user) {
                                res.json({ message: "Création de l'utilisateur", userId: user.id })
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

    db.User.count({
        where: ({
            email: req.body.email
        })
    })
        .then((user) => {

            if (user == 0) {

                return res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });

            } else {

                db.User.findAll({
                    attributes: ['id', 'password'],
                    where: ({
                        email: req.body.email
                    })
                })

                    .then((user) => {


                        const userIdDB = user[0].dataValues.id
                        const passwordDB = user[0].dataValues.password

                        bcrypt.compare(req.body.password, passwordDB)
                            .then(valid => {

                                if (valid) {

                                    res.status(200).json({
                                        userId: userIdDB,
                                        token: jwt.sign(
                                            { userId: userIdDB },
                                            //process.env.TOKEN,
                                            'RANDOM_TOKEN_SECRET',
                                            { expiresIn: '24h' }
                                        )
                                    });

                                } else {

                                    return res.status(401).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
                                }

                            })
                            .catch((error) => {
                                res.status(500).json({ error })
                            })

                    })
                    .catch((error) => {
                        res.status(500).json({ error })

                    })

            }


        })

}


exports.identity = (req, res, next) => {

    db.User.findAll({
        attributes: ['firstname', 'lastname'],

        where: {
            id: req.userId
        }
    })
        .then((user) => {

            const firstname = user[0].dataValues.firstname
            const lastname = user[0].dataValues.lastname

            res.status(200).json({ firstname: firstname, lastname: lastname })
        })
        .catch((errror) => {
            res.status(404).json({ message: 'La ressource n existe pas' })
        })
}

exports.delete = (req, res, next) => {

    db.User.destroy({
        where: {
            id: req.userId
        }
    }).then((user) => user ? res.status(200).json({ message: "L utilisateur a été supprimé" }) : res.status(404).json({ error: "L'utilisateur n'existe pas" }))
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.updatPassword = (req, res, next) => {

    db.User.findAll({
        where: {
            id: req.userId
        }
    })
        .then((user) => {

            if (req.body.password == undefined) {
                res.status(400).json({ message: 'Il manque le password' })
            }


            const passwordDB = user[0].dataValues.password

            //on verifie le mot de passe avant la MAJ

            bcrypt.compare(req.body.password, passwordDB)
                .then(valid => {

                    if (valid) {

                        bcrypt.hash(req.body.newPassword, 10)
                            .then(hash => {

                                db.User.update(
                                    { password: hash },
                                    {
                                        where:
                                            { id: req.params.id }
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

        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur serveur ", error })
        })
}