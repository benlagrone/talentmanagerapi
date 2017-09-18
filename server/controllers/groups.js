const Group = require('../models').Group;

module.exports = {
    create(req, res) {
        return Group
            .create({
                // title: req.body.title,
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(group => res.status(201).send(group))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Group
            .all()
            .then(group => res.status(200).send(group))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Group
        .find({where: {id: req.params.id}})
        .then((group) => {
            if(!group){
                return res.status(400).send({
                    message:'Group not found',
                });
            }
            return group
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(group);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Group
        .find({where: {id: req.params.id}})
        .then(group => {
            if(!group){
                return res.status(400).send({
                    message:'Group not found',
                });
            }
            return group
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};