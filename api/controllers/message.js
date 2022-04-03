const bodyParser = require('body-parser');
const db = require('./../lib/models/index.js');

exports.create = (req,res,next) => {

    db.Message.create({
        userId : req.userId,
        ...req.body
    })
    .then(() => {
        res.status(200).json({message : "ok"})

    })
    .catch((error) => {
        res.status(500).json({error})
    })

}