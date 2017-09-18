const Category = require('../models').Category;

module.exports = {
    create(req, res) {
        return Category
            .create({
                // title: req.body.title,
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(category => res.status(201).send(category))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Category
            .all()
            .then(category => res.status(200).send(category))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Category
        .find({where: {id: req.params.id}})
        .then((category) => {
            if(!category){
                return res.status(400).send({
                    message:'Category not found',
                });
            }
            return category
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(category);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Category
        .find({where: {id: req.params.id}})
        .then(category => {
            if(!category){
                return res.status(400).send({
                    message:'Category not found',
                });
            }
            return category
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};