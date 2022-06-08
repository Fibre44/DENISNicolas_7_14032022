const db = require('./../lib/models/index.js');

exports.home = (req, res, next) => {
    res.status(200).json({ message: 'Bienvenue sur l espace admin' })
}

exports.allMessages = (req, res, next) => {
    db.Message.findAll({
        attributes: ['id', 'message', 'createdAt', 'updatedAt'],
        order: ['updatedAt']
    })
        .then((messages) => {
            res.status(200).json({ messages })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}
exports.allComments = (req, res, next) => {
    db.Comment.findAll({
        attributes: ['id', 'comments', 'createdAt', 'updatedAt'],
        order: ['updatedAt']
    })
        .then((comments) => {
            res.status(200).json({ comments })
        })
        .catch((error) => {
            res.status(200).json({ error })
        })
}

exports.deleteMessage = (req, res, next) => {
    db.Message.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json({ message: 'Suppression du message' })
    }).catch((error) => {
        res.status(500).json(({ error }))
    })
}

exports.deleteComment = (req, res, next) => {
    db.Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).json({ message: 'Suppression du commentaire' })
        })
        .catch((error) => {
            res.status.json({ error })
        })

}

exports.addAdmin = (req, res, next) => {

    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            db.User.update({ role: 'Administrator' },
                { where: { email: req.body.email } }
            ).then(() => {
                res.status(200).json({ message: 'Mise à jour du role' })
            })
        } else {
            res.status(404).json({ message: 'Utilisateur inexistant' })
        }
    }).catch((error) => {
        res.status(500).json({ error })
    })


}