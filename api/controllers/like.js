const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {
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

exports.count = (req, res, next) => {
    db.Like.count({
        where: {
            idelement: req.body.idElement,
            type: req.body.type
        }
    }).then((like) => {
        res.status(200).json({ like })
    })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.userLike = (req, res, next) => {
    db.Like.findOne({
        where: {
            userId: req.userId,
            idelement: req.body.idElement,
            type: req.body.type
        }
    }).then((like) => {
        if (like) {
            res.status(200).json({ message: true })
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