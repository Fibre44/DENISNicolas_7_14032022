const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {
    db.Like.findOne({
        where: {
            userId: req.userId,
            type: req.body.type,
            idelement: req.body.idelement
        }
    })
        .then((like) => {
            if (like) {
                res.status(403).json({ message: 'Vous ne pouvez pas like deux fois le même message' })
            } else {
                db.Like.create({
                    userId: req.userId,
                    ...req.body
                })
                    .then(() => {
                        res.status(200).json({ message: 'Like' })
                    }).catch((error) => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.delete = (req, res, next) => {
    db.Like.findOne({
        where: {
            userId: req.userId,
            type: req.body.type,
            idelement: req.body.idelement
        }
    }).then((like) => {
        if (like) {
            db.Like.destroy({
                where: {
                    userId: req.userId,
                    type: req.body.type,
                    idelement: req.body.idelement
                }
            }).then(() => {
                res.status(200).json({ message: "Suppression du like" })
            }).catch((error) => {
                res.status(500).json({ error })
            })
        } else {
            db.Like.findOne({
                where: {
                    type: req.body.type,
                    idelement: req.body.idelement
                }
            })
                .then((like) => {
                    if (like) {
                        res.status(403).json({ message: 'Vous ne pouvez pas supprimer ce like' })
                    } else {
                        res.status(404).json({ message: 'Ce code n\'existe pas' })
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error })
                })
        }
    })
}

exports.userLike = (req, res, next) => {
    db.Like.findAll({
        attributes: ['type', 'idelement'],
        where: {
            userId: req.userId,
            type: req.params.type
        },
    }).then((likes) => {
        if (likes) {
            res.status(200).json({ likes })
        } else {
            res.status(200).json({ message: false })
        }
    }).catch((error) => {
        res.status(500).json({ error })
    })
}

exports.groupLikes = (req, res, next) => {
    db.Like.count({
        attributes: ['type', 'idelement'],
        where: {
            groupId: req.params.id,
            type: req.params.type
        },
        group: ['type', 'idelement']
    }).then((likes) => {
        res.status(200).json({ likes })
    }).catch((error) => {
        res.status(500).json({ error })
    })
}