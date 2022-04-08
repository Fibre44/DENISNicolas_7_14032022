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
                    comments: req.body.comments,
                    autor: req.body.autor,
                    likes: 0,
                    dislikes: 0
                })

                res.status(200).json({ message: "ok" })
            } else {
                res.status(404).json({ message: 'L id du message n existe pas' })
            }

        })

        .catch((error) => {
            res.status(500).json({ error })
        })

}

