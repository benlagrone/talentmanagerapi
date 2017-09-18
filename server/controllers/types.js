const Type = require('../models').Type;

module.exports = {
    create(req, res) {
        return Type
            .create({
                // title: req.body.title,
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(type => res.status(201).send(type))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Type
            .all()
            .then(type => res.status(200).send(type))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Type
        .find({where: {id: req.params.id}})
        .then((type) => {
            if(!type){
                return res.status(400).send({
                    message:'Type not found',
                });
            }
            return type
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(type);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Type
        .find({where: {id: req.params.id}})
        .then(type => {
            if(!type){
                return res.status(400).send({
                    message:'Type not found',
                });
            }
            return type
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};