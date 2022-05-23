const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user != null) {
            db.Invite.create({
                UserId: user.id,
                ...req.body
            }).then(() => {
                res.status(200).json({ message: 'invitation envoyée' })

            })
        } else {
            res.status(404).json({ message: 'L\'utilisateur n\'existe pas' })
        }

    }).catch((error) => {
        res.status(500).json({ error })
    })

}

exports.getAll = (req, res, next) => {
    db.User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => (
        user.getInvites({ attributes: ['id'] })
            .then((invites) => {
                res.status(200).json({ invites })
            })
    )).catch((error) => {
        res.status(500).json({ error })
    })
}

exports.delete = (req, res, next) => {
    db.Invite.destroy({
        where: {
            UserId: req.userId,
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json({ message: 'Suppression de l\'invitation' })
    }).catch((error) => {
        res.status(500).json({ error })
    })
}

exports.accept = (req, res, next) => {
    db.Invite.findOne({
        attributes: ['id'],
        where: {
            UserId: req.userId,
            id: req.params.id
        }
    }).then((invitation) => {
        db.Groupe.findOne({
            where: {
                id: invitation.dataValues.id
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
    }).catch((error) => {
        res.status(500).json({ error })
    })
}

exports.count = (req, res, next) => {
    db.Invite.count({
        where: {
            UserId: req.userId
        }
    }).then((count) => {
        res.status(200).json({ count })
    }).catch((error) => {
        res.status(500).json({ error })
    })
}