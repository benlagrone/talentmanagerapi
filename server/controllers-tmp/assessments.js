const Assessment = require('../models').Assessment;

module.exports = {
    create(req, res) {
        return Assessment
            .create({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(assessment => res.status(201).send(assessment))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Assessment
            .all()
            .then(assessment => res.status(200).send(assessment))
            .catch(error => res.status(400).send(error));
    },

};