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
        where : {
            private:false
        }

    })
        .then((groups) => {
            res.status(200).json({ groups })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })

}

exports.groupMessages = (req,res,next) => {

    db.Groupe.findOne({
        where : {
            id : req.params.id
        }
    })
    .then((group) => {

        if (group) {

            group.getMessages()

            .then((messages)=> {
    
                res.status(200).json({messages})
    
            })
            .catch((error)=>{
                res.status(500).json({error})
    
            })
        }else{
            res.status(404).json({message : 'Le goupe n existe pas'})
        }

    })
    .catch((error) => {
        res.status(500).json({error})
    })

}