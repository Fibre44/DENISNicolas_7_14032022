const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {

    db.Message.create({
        userId: req.userId,
        ...req.body
    })
        .then(() => {
            res.status(200).json({ message: "ok" })

        })
        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.comments = (req, res, next) => {

    db.Message.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((message) => {

            if (message) {

                message.getComments()
                    .then((comments) => {
                        res.status(200).json({ comments })
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })

            } else {
                res.status(404).json({ message: 'L id du message n existe pas' })
            }

        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}
