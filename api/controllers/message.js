const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {

    db.Groupe.findOne({
        where: {
            id: req.body.groupId
        }
    })
        .then((group) => {
            group.createMessage({
                userId: req.userId,
                message: req.body.message,
                autor: req.body.autor
            })
                .then((message) => {
                    res.status(200).json({ uuidMessage: message.id })

                })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.edit = (req, res, next) => {

    //On repart du groupe pour etre sur l'id du message est bien rattaché au groupe
    db.Groupe.findOne({
        where: {
            id: req.body.groupId
        }
    })
        .then((group) => {
            group.getMessages({
                where: {
                    id: req.params.idMessage
                }
            })
                .then((message) => {
                    if (message === []) {
                        res.status(404).json({ message: 'le message n\'existe pas' })
                    } else if (message[0].dataValues.userId == req.userId) {
                        db.Message.update({ message: req.body.message }, {
                            where: {
                                id: req.params.idMessage
                            }
                        }).then(() => {
                            console.log(message.id)
                            res.status(200).json({ message: 'Mise à jour du message' })
                        })
                    } else {
                        res.status(403).json({ message: 'Vous ne pouvez pas modifier ce message' })
                    }
                })
                .catch((error) => {
                    res.status((500).json({ error }))
                })
        })
}

exports.delete = (req, res, next) => {

    db.Groupe.findOne({
        where: {
            id: req.body.groupId
        }
    })
        .then((group) => {
            group.getMessages({
                where: {
                    id: req.params.idMessage
                }
            })
                .then((message) => {
                    if (message[0].dataValues.userId == req.userId) {
                        db.Message.destroy({
                            where: {
                                id: req.params.idMessage,
                            }
                        }).then(() => {
                            db.Comment.destroy({
                                where: {
                                    messageId: req.params.idMessage
                                }
                            })
                        })
                            .then(() => {
                                res.status(200).json({ message: 'Le message a été supprimé' })
                            })
                    } else if (message == []) {
                        res.status(404).json({ message: 'le message n\'existe pas' })
                    } else {
                        res.status(403).json({ message: 'Vous ne pouvez pas supprimer ce message' })
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error })
                })

        })

}
