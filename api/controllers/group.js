const db = require('./../lib/models/index.js');

exports.create = (req, res, next) => {

    db.Groupe.create({
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