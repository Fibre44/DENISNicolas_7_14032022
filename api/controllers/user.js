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


exports.user = (req, res, next) => {
    attributes: ['firstname', 'lastname'],

        db.User.findAll({

            where: {
                id: req.params.id
            }
        })
            .then((user) => {

                const firstname = user[0].dataValues.firstname
                const lastname = user[0].dataValues.lastname

                res.status(200).json({ firstname: firstname, lastname: lastname })
            })
            .catch((errro) => {
                res.status(404).json({ message: 'La ressource n existe pas' })
            })
}