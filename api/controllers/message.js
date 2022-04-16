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
                    if (message) {
                        db.Message.update({ message: req.body.message }, {
                            where: {
                                id: req.params.idMessage
                            }
                        }).then((message) => {
                            res.status(200).json({ message })
                        })
                            .catch((error) => {
                                res.status(500).json({ error })
                            })
                    } else {
                        res.status(404).json({ message: 'le message n\'existe pas' })
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
                    if (message) {
                        db.Message.destroy({
                            where: {
                                id: req.params.idMessage
                            }
                        })
                            .then(() => {
                                res.status(200).json({ message: 'Le message a été supprimé' })
                            })
                    } else {
                        res.status(404).json({ message: 'Le message n\'existe pas' })
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error })
                })

        })

}
