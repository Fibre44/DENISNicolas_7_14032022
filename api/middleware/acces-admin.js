const db = require('../lib/models/index.js');
module.exports = (req, res, next) => {
    db.User.findOne({
        where: {
            id: req.userId
        }
    })
        .then((user) => {
            if (user.role == 'Administrator') {
                next()
            } else {
                res.status(403).json({ message: 'L\'accès est réservé aux administrateurs' })
            }
        })

}