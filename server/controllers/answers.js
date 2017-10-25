const Answer = require('../models').Answer;
const QuestionAnswer = require('../models').question_answer;
const QuestionAnswerC = require('../models').question_answer_c;
var QuestionAnswerModels = [Answer, QuestionAnswer, QuestionAnswerC];

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
        console.log('list')
        return Answer
            .all()
            .then(answer => res.status(200).send(answer))
            .catch(error => res.status(400).send(error));
    },
    listByQuestionIds(req, res) {
        Promise.all(QuestionAnswerModels.map(AnswersByQuestion => {
            return AnswersByQuestion.findAll()
        }))
            .then((results) => {
                // console.log('results', results)
                let answerList = results[1].filter((a) => {
                    return req.body.indexOf(parseInt(a.dataValues.questionId));
                });
                let answerIds = answerList.map((a) => a.dataValues)
                console.log('answerIds',answerIds)
                let answerCList = results[2].filter((c)=>{
                    return req.body.indexOf(parseInt(c.dataValues.questionId));
                })
                let answerCIds = answerCList.map((c)=>c.dataValues);
                let questionAnswersArray = [];
                req.body.forEach((q) => {
                    let questionObject = {}
                    questionObject.questionId = q;
                    questionObject.answersPerQuestion = [];
                    answerIds.forEach((a) => {
                        if (q === a.questionId) {
                            let answersText = results[0].map(c => c.dataValues)
                            let answerText = answersText.filter((t) => t.id === a.answerId)
                            a.answerText = answerText[0].answertext;
                            a.correct = false;
                            answerCIds.forEach((c) => {
                                if (q === parseInt(c.questionId)) {
                                    if(parseInt(a.answerId)===parseInt(c.answerId)){
                                        a.correct=true;
                                    }
                                }
                            })
                            questionObject.answersPerQuestion.push(a);
                        }
                    });
                    questionAnswersArray.push(questionObject);
                });
                res.status(200).send(questionAnswersArray);
            })

    },
    listByQuestionId(req,res) {
        Promise.all(QuestionAnswerModels.map(AnswersByQuestion => {
            return AnswersByQuestion.findAll()
        }))
        .then((results)=>{
            let answerList = results[1].filter((a)=>{
                return parseInt(req.params.id) === parseInt(a.dataValues.questionId)
            });
            let answerIds = answerList.map((a) => a.dataValues)
            let answerCList = results[2].filter((c)=>{
                return parseInt(req.params.id) === parseInt(c.dataValues.questionId)
            })
            let answerCIds = answerCList.map((c)=>c.dataValues);
            let questionAnswersArray = [];
            // let response = answerIds;

            
// let foo = [req.params.id]
            // foo.forEach((q) => {
                let questionObject = {}
                questionObject.questionId = req.params.id;
                questionObject.answersPerQuestion = [];
                answerIds.forEach((a) => {
                    console.log('a',a)
                    if (parseInt(req.params.id) === parseInt(a.questionId)) {
                        let answersText = results[0].map(c => c.dataValues);
                        console.log('answersText', answersText)
                        let answerText = answersText.filter((t) => t.id === a.answerId)
                        a.answerText = answerText[0].answertext;
                        a.correct = false;
                        answerCIds.forEach((c) => {
                            if (parseInt(req.params.id) === parseInt(c.questionId)) {
                                if(parseInt(a.answerId)===parseInt(c.answerId)){
                                    a.correct=true;
                                }
                            }
                        })
                        questionObject.answersPerQuestion.push(a);
                    }
                });
                // questionAnswersArray.push(questionObject);
            // });

            console.log('questionObject', questionObject)
            res.status(200).send(questionObject);

        })
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
                        .then(QuestionAnswerC.destroy({ where: { answerId: answer.id } }))
                        .then(answer.destroy())
                        .catch(error => res.status(400).send(error));
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};