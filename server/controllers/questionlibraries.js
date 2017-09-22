const QuestionLibrary = require('../models').QuestionLibrary;

module.exports = {
    create(req, res) {
        return QuestionLibrary
            .create({
                // title: req.body.title,
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            .then(questionlibrary => res.status(201).send(questionlibrary))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return QuestionLibrary
            .all()
            .then(questionlibrary => res.status(200).send(questionlibrary))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return QuestionLibrary
        .find({where: {id: req.params.id}})
        .then((questionlibrary) => {
            if(!questionlibrary){
                return res.status(400).send({
                    message:'QuestionLibrary not found',
                });
            }
            return questionlibrary
            .update({
                name: req.body.name,
                description: req.body.description,
                active: req.body.active
            })
            res.status(200).send(questionlibrary);
        })
        .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return QuestionLibrary
        .find({where: {id: req.params.id}})
        .then(questionlibrary => {
            if(!questionlibrary){
                return res.status(400).send({
                    message:'QuestionLibrary not found',
                });
            }
            return questionlibrary
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
    },
};