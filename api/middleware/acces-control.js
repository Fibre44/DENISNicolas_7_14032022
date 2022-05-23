const db = require('../lib/models/index.js');

module.exports = (req, res, next) => {
    try {
        db.User.findOne({
            where: {
                id: req.userId
            }
        })
            .then((user) => {
                user.getGroupes()
                    .then((groups) => {
                        //on controle que l'utilisateur posséde bien une association avec la table Groupe via la table USER_GROUPE
                        let searchGroupId = null
                        if (req.params.id) {
                            searchGroupId = req.params.id
                        }
                        else {
                            searchGroupId = req.body.groupId
                        }
                        const searchGroup = groups.find(group => group.id === searchGroupId)
                        if (searchGroup) {
                            next()
                        } else {
                            //Sinon 2 possibilités le groupe n'existe pas / l'utilisateur ne peut pas accéder à ce groupe
                            let idGroup = null
                            if (req.params.id) {
                                idGroup = req.params.id
                            } else {
                                idGroup = req.body.groupId
                            }
                            db.Groupe.findOne({
                                where: {
                                    id: idGroup
                                }
                            })
                                .then((group) => {
                                    if (group) {
                                        res.status(403).json({ message: "Gestion des accès vous ne pouvez pas consulter ce groupe" })
                                    } else {
                                        res.status(404).json({ message: "Gestion des accès la ressource n'existe pas" })
                                    }
                                })
                                .catch((error) => {
                                    res.status(404).json({ message: "Gestion des accès la ressource n'existe pas" })
                                })
                        }
                    })
            })

    } catch {
        res.status(500).json({ message: "ko" })

    }
}