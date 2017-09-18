const Group = require('../models').Group;

module.exports = {
    create(req, res) {
        return Group
            .create({
                name: req.body.name,
                active: req.body.active,
                description: req.body.description
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
};