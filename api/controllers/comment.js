const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {
    db.Message.findOne({
        where: {
            id: req.body.messageId
        }
    })
        .then((message) => {
            if (message) {
                message.createComment({
                    userId: req.userId,
                    comments: req.body.comment,
                    autor: req.body.autor,
                    groupeId: req.body.groupId
                })
                res.status(200).json({ message: 'ok' })
            } else {
                res.status(404).json({ message: 'L id du message n existe pas' })
            }

        })

        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.delete = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.idComment,
            userId: req.userId,
            messageId: req.body.messageId
        }
    })
        .then((comment) => {
            if (comment) {
                db.Comment.destroy({
                    where: {
                        id: req.params.idComment,
                        userId: req.userId,
                        messageId: req.body.messageId
                    }
                }).then(() => {
                    res.status(200).json({ message: 'Suppression du commentaire' })

                })
            } else if (comment == null) {
                // Si null on cherche si erreur 403 ou 404
                db.Comment.findOne({ where: { id: req.params.idComment } })
                    .then((comment) => {
                        if (comment == null) {
                            res.status(404).json({ message: 'L\id n\'existe pas' })
                        } else if (comment.dataValues.userId != req.userId) {
                            res.status(403).json({ message: 'Vous ne pouvez pas modifier ce commentaire' })
                        } else {
                            res.status(404).json({ message: 'L\'id du message ne correspond pas au commentaire' })
                        }
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.edit = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.idComment,
            userId: req.userId,
            messageId: req.body.messageId
        }
    })
        .then((comment) => {
            if (comment) {
                db.Comment.update({
                    comments: req.body.comment,
                    where: {
                        id: req.params.idComment,
                        userId: req.userId,
                        messageId: req.body.messageId
                    }
                })
                res.status(200).json({ message: 'Mise à jour du commentaire' })
            } else {
                db.Comment.findOne({
                    attributes: ['messageId', 'userId'],
                    where: {
                        id: req.body.idComment,

                    }
                }).then((comment) => {

                    console.log(comment)
                })
            }
        }).catch((error) => {
            res.status(500).json({ error })
        })
}

