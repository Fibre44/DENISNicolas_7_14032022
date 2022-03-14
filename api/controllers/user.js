const db = require('./../lib/models/index.js');
const bcrypt = require('bcrypt');


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
                                res.json(user)
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

    console.log(JSON.stringify(req.body))

    res.status(200).json({ message: "ok" })

}