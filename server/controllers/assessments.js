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
    // listbycategory(req, res) {
    //     return Assessment
    //     .find({})
    // },
    update(req, res) {
        return Assessment
        .find({where: {id: req.params.id}})
        .then((assessment) => {
            if(!assessment){
                return res.status(400).send({
                    message:'Assessment not found',
                });
            }
            return assessment
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(assessment);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Assessment
        .find({where: {id: req.params.id}})
        .then(assessment => {
            if(!assessment){
                return res.status(400).send({
                    message:'assessment not found',
                });
            }
            return assessment
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};