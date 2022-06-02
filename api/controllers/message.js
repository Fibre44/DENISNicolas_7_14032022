const db = require('./../lib/models/index.js');
const fs = require('fs');

exports.create = (req, res, next) => {
    db.Groupe.findOne({
        where: {
            id: req.body.groupId
        }
    })
        .then((group) => {
            let imageUrl = null
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
            }
            group.createMessage({
                userId: req.userId,
                message: req.body.message,
                autor: req.body.autor,
                imageDescription: req.body.description,
                imageUrl: imageUrl
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

// Pour supprimer un message on doit aussi supprimer les commentaires liés pour éviter les enregistrements orphelins
exports.delete = (req, res, next) => {

    db.Message.findOne({
        where: {
            id: req.params.idMessage,
            groupeId: req.body.groupId,
            userId: req.userId
        }
    }).then((message) => {

        if (message) {
            const filename = message.dataValues.imageUrl
            fs.unlink(`upload/${filename}`, () => {
                //On supprime les commentaires problème avec la gestion de la cascade de suppression de l'ORM
                db.Comment.destroy({
                    where: {
                        messageId: req.params.idMessage
                    }
                }).then(() => {
                    db.Message.destroy({
                        where: {
                            id: req.params.idMessage,
                            groupeId: req.body.groupId,
                            userId: req.userId
                        }
                    }).then(() => {
                        res.status(200).json({ message: 'Le message a été supprimé et des commentaires' })
                    })
                })
            })

        }
    })


}
