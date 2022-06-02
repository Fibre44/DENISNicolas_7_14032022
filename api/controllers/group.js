const db = require('./../lib/models/index.js');
const fs = require('fs');

exports.create = (req, res, next) => {
    //Si on n\'existe pas'active pas la coche sur le frontend alors le champ private est vide mais il est requis coté BDD
    let group = null
    if (req.body.private == undefined) {
        group = {
            ...req.body,
            private: false
        }
    } else {
        group = {
            ...req.body
        }
    }
    let imageUrl = null
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    }
    console.log(req.body)
    db.Groupe.create({
        ...group,
        createBy: req.userId,
        imageUrl: imageUrl,
    })
        .then((group) => {
            group.addUser(req.userId, { through: { selfGranted: false } })
            res.status(200).json({ group })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.groups = (req, res, next) => {

    db.Groupe.findAll({
        attributes: ['id', 'title', 'description'],
        where: {
            private: false
        }
    })
        .then((groups) => {
            res.status(200).json({ groups })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.groupMessages = (req, res, next) => {

    db.Groupe.findOne({
        where: {
            id: req.params.id
        },
    })
        .then((group) => {
            if (group) {
                group.getMessages({
                    attributes: ['id', 'message', 'userId', 'autor', 'GroupeId', 'updatedAt', 'imageUrl', 'imageDescription'],
                    order: [
                        ['updatedAt', 'DESC'],
                    ],
                })
                    .then((messages) => {
                        res.status(200).json({ messages })
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            } else {
                res.status(404).json({ message: 'Le goupe n\'existe pas existe pas' })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.groupComments = (req, res, next) => {

    //on repart du groupe
    db.Groupe.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((group) => {
            if (group) {
                //on récupére l'ensemble des messages du groupe
                group.getMessages()
                    .then((messages) => {
                        //On verifie que l'id du message existe bien dans le groupe
                        const searchMessage = messages.find(message => message.id === req.params.idMessage)
                        if (searchMessage) {
                            searchMessage.getComments({
                                order: [
                                    ['updatedAt', 'DESC'],
                                ]
                            })
                                // on récupere les commentaires
                                .then((comments) => {
                                    if (comments) {
                                        res.status(200).json({ comments })
                                    } else {
                                        res.status(404).json({ message: 'L\'id message n\'existe pas\'existe pas' })
                                    }
                                })
                                .catch((error) => {
                                    res.status(500).json({ error })
                                })
                        } else {
                            //on verifie si le message existe. Si il existe alors erreur 403 car il n\'existe pas'est pas dans le groupe sinon 404 
                            db.Message.findOne({
                                where: {
                                    id: req.params.idMessage
                                }
                            })
                                .then((message) => {

                                    if (message) {
                                        res.status(403).json({ message: 'Le commentaire n\'existe pas\'est pas associé à ce message' })

                                    } else {
                                        res.status(404).json({ message: 'Le message n\'existe pas\'existe pas' })
                                    }
                                })
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })

            } else {
                res.status(403).json({ message: 'Le message n\'existe pas\'appartient pas à ce groupe' })
            }
        })

        .catch((error) => {
            res.status(404).json({ message: 'Le groupe n\'existe pas\(existe pas' })
        })

}

exports.getGroupeDescription = (req, res, next) => {
    db.Groupe.findOne({
        attributes: ['description', 'imageUrl', 'imageDescription'],
        where: {
            id: req.params.id
        }
    }).then((groupe) => {
        res.status(200).json({ groupe })
    }).catch((error) => {
        res.status(500).json({ error })
    })
}

//Pour supprimer un groupe on doit supprimer les messages et les commentaires

exports.delete = (req, res, next) => {

    if (req.params.id == 'Groupomania') {
        res.status(403).json({ message: 'Vous ne pouvez pas supprimer le groupe Groupomania' })
    } else {
        db.Groupe.findOne({
            where: {
                id: req.params.id
            }
        }).then((group) => {
            if (group) {
                group.getMessages()
                    .then((messages) => {
                        //On va parcourir le tableau de messages pour supprimer les commentaires
                        messages.foreach(id =>
                            db.Comment.destroy({
                                where: {
                                    MessageId: id
                                }
                            }).then((messages) => {

                                messages.foreach(id => {
                                    db.Message.findOne({
                                        where: {
                                            id: id
                                        }
                                    }).then((message) => {
                                        const filename = message.dataValues.imageUrl
                                        fs.unlink(`upload/${filename}`, () => {
                                            db.Message.destroy({
                                                where: {
                                                    id: id
                                                }
                                            })
                                        })

                                    })
                                })

                            })
                        )
                    })
            } else {
                res.status(404).json({ message: 'Le groupe n\'existe pas' })
            }
        }).catch((error) => {
            res.status(500).json({ error })
        })
    }

}