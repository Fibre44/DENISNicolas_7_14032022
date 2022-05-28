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
            user.getGroupes()
                .then((groups) => {
                    res.status(200).json({ groups })
                })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.delete = (req, res, next) => {

    //Controle on ne peut pas quitter le groupe par default

    if (req.body.groupId == "Groupomania") {
        res.status(403).json({ message: "Vous ne pouvez pas quitter le groupe Goupomania" })
    } else {
        db.Groupe.findOne({
            where: {
                id: req.body.groupId
            }
        })
            .then((group) => {
                if (group) {
                    group.removeUser(req.userId, { through: { selfGranted: false } })
                    res.status(200).json({ message: "Vous avez quitté le groupe" })
                } else {
                    res.status(404).json({ message: "Le groupe n'existe pas" })
                }
            })
            .catch((error) => {
                res.status(500).json({ error })
            })
    }


}