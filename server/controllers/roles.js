const Role = require('../models').Role;

module.exports = {
    create(req, res) {
        return Role
            .create({
                // title: req.body.title,
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(role => res.status(201).send(role))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Role
            .all()
            .then(role => res.status(200).send(role))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Role
        .find({where: {id: req.params.id}})
        .then((role) => {
            if(!role){
                return res.status(400).send({
                    message:'Role not found',
                });
            }
            return role
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(role);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Role
        .find({where: {id: req.params.id}})
        .then(role => {
            if(!role){
                return res.status(400).send({
                    message:'Role not found',
                });
            }
            return role
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};