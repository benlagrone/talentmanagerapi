const Answer = require('../models').Answer;

module.exports = {
    create(req, res) {
        console.log(req.body)
        return Answer
            .create({
                answertext: req.body.answertext,
                active: req.body.active,
            })
            // .then()
            .then(answer => res.status(201).send(answer))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        console.log('finding answer')
        return Answer
            // .all()
            .findAll(
                // where: {id:1}
                // include:[{
                //     model: QuestionId,
                //     as: 'Questions',
                // },{
                //     model: UserId,
                //     as: 'Author',
                // }]
                // {include: ['user']}
            )
            .then(result => {
                console.log('prep answer', result)
                res.status(200).send(result)
            })
            .catch(error => res.status(400).send(error));
    },
};