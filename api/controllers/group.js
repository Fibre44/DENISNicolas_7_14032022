const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {

    db.Groupe.create({
        createBy: req.userId,
        ...req.body
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
                    attributes: ['id', 'message', 'userId', 'autor', 'GroupeId', 'updatedAt'],
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
                res.status(404).json({ message: 'Le goupe n existe pas' })
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
                                        res.status(404).json({ message: 'L\'id message n\'existe pas' })
                                    }
                                })
                                .catch((error) => {
                                    res.status(500).json({ error })
                                })
                        } else {
                            //on verifie si le message existe. Si il existe alors erreur 403 car il n'est pas dans le groupe sinon 404 
                            db.Message.findOne({
                                where: {
                                    id: req.params.idMessage
                                }
                            })
                                .then((message) => {

                                    if (message) {
                                        res.status(403).json({ message: 'Le commentaire n\'est pas associé à ce message' })

                                    } else {
                                        res.status(404).json({ message: 'Le message n\'existe pas' })
                                    }
                                })
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })

            } else {
                res.status(403).json({ message: 'Le message n\'appartient pas à ce groupe' })
            }
        })

        .catch((error) => {
            res.status(404).json({ message: 'Le groupe n\(existe pas' })
        })

}

exports.getGroupeDescription = (req, res, next) => {
    db.Groupe.findOne({
        attributes: ['description'],
        where: {
            id: req.params.id
        }
    }).then((groupe) => {
        res.status(200).json({ groupe })
    }).catch((error) => {
        res.status(500).json({ error })
    })
}