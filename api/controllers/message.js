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
