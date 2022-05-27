const db = require('./../lib/models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const token = process.env.TOKEN

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
                            role: 'Employee',
                            picture: ''
                        })
                            .then(function (user) {

                                user.addGroupe('Groupomania', { through: { selfGranted: false } })
                                    .then((user) => {
                                        res.json({ message: "Création de l'utilisateur", userId: user.id })
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
                            ), { httpOnly: true, secure: false, domain: 'localhost' })
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
        attributes: ['id', 'firstname', 'lastname'],

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

exports.picture = (req, res, next) => {
    db.User.update(
        { picture: req.body }, {
        where: {
            id: req.userId
        }
    }
    ).then(() => {
        res.status(200).json({ message: 'Mise à jour de la photo de profil' })
    }).catch((error) => {
        res.status(500).json({ error })
    })

}

exports.getPicture = (req, res, next) => {
    db.User.findOne({
        attributes: ['picture'],
        where: {
            id: req.userId
        }
    }).then((picture) => {

        res.send(picture.dataValues.picture)
    })
}