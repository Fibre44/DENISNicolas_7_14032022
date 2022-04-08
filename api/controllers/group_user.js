const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {

    db.Groupe.findOne({
        where: {
            id: req.body.groupId
        }
    })
        .then((group) => {

            if (group) {
                group.addUser(req.userId, { through: { selfGranted: false } })
                res.status(200).json({ message: "Création de l'association" })

            } else {
                res.status(404).json({ message: "Le groupe n'existe pas" })

            }

        })
        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.groupsByUser = (req, res, next) => {

    db.User.findOne({
        attributes: ['id'],

        where: {
            id: req.userId
        },
        include: db.Groupe

    })
        .then((user) => {
            res.status(200).json({ user })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}