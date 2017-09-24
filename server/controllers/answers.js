const Answer = require('../models').Answer;
const QuestionAnswer = require('../models').question_answer;
const QuestionAnswerC = require('../models').question_answer_c;

module.exports = {
    create(req, res) {
        return Answer
            .create({
                answertext: req.body.answertext,
                active: req.body.active
            })
            .then(answer => res.status(201).send(answer))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Answer
            .all()
            .then(answer => res.status(200).send(answer))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Answer
            .find({ where: { id: req.params.id } })
            .then((answer) => {
                if (!answer) {
                    return res.status(400).send({
                        message: 'answer not found',
                    });
                }
                return answer
                    .update({
                        answertext: req.body.answertext,
                        active: req.body.active
                    })
                res.status(200).send(answer);
            })
            .catch(error => res.status(400).send(error));
    },
    remove(req, res) {
        return Answer
            .find({ where: { id: req.params.id } })
            .then(answer => {
                if (answer) {
                    QuestionAnswer.destroy({ where: { answerId: answer.id } })
                        .then(QuestionAnswerA.destroy({ where: { answerId: answer.id } }))
                        .then(answer.destroy())
                        .catch(error => res.status(400).send(error));
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};