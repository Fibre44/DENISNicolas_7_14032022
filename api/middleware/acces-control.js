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

                        //on controle que l'utilisateur possede bien une association avec la table Groupe via la table USER_GROUPE

                        const searchGroup = groups.find(group => group.id === req.params.id || req.body.groupId)

                        if (searchGroup) {

                            next()

                        } else {
                            //Sinon 2 possibilités le groupe n'existe pas / l'ulilisateur ne peut pas accéder à ce groupe

                            db.Groupe.findOne({
                                where: {
                                    id: req.params.id
                                }
                            })
                                .then((group) => {

                                    if (group) {
                                        res.status(403).json({ message: "Gestion des accès vous ne pouvez pas consulter ce groupe" })
                                    } else {
                                        res.status(404).json({ message: "Gestion des accès la ressource n'existe pas" })
                                    }
                                })
                        }
                    })
            })

    } catch {
        res.status(500).json({ message: "ko" })

    }
}