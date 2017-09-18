const QuestionLibrary = require('../models').QuestionLibrary;

module.exports = {
    create(req, res) {
        return QuestionLibrary
            .create({
                name: req.body.name,
                description: req.body.description,
                source: req.body.source
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
};