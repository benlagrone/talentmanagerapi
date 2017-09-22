const Question = require('../models').Question;
const QuestionType = require('../models').question_type;
const QuestionCategory = require('../models').question_category;
const QuestionQuestionLibrary = require('../models').question_questionlibrary;
const QuestionUser = require('../models').question_user;
const QuestionChild = require('../models').question_child;
const QuestionAnswer = require('../models').question_answer;
const QuestionAnswerA = require('../models').question_answer_a;
var models = [Question, QuestionType, QuestionCategory, QuestionUser, QuestionQuestionLibrary, QuestionAnswer, QuestionAnswerA];

module.exports = {
    create(req, res) {
        return Question
            .create({
                description: req.body.description,
                questiontext: req.body.questiontext,
                active: req.body.active,
                weight: req.body.weight
            })
            .then((question) => {
                if (req.body.type) {
                    req.body.type.forEach((type) => {
                        QuestionType.create({
                            questionId: question.dataValues.id,
                            typeId: type
                        })
                    })
                }
                if (req.body.category) {
                    req.body.category.forEach((category) => {
                        QuestionCategory.create({
                            questionId: question.dataValues.id,
                            categoryId: category
                        })
                    })
                }
                if (req.body.user) {
                    req.body.user.forEach((user) => {
                        QuestionUser.create({
                            questionId: question.dataValues.id,
                            userId: user
                        })
                    })
                }
                if (req.body.questionlibraries) {
                    req.body.questionlibraries.forEach((questionlibrary) => {
                        QuestionQuestionLibrary.create({
                            questionId: question.dataValues.id,
                            questionLibraryId: questionlibrary
                        })
                    })
                }
                if (req.body.answers) {
                    req.body.answers.forEach((answer) => {
                        QuestionAnswer.create({
                            questionId: question.dataValues.id,
                            answerId: answer
                        })
                    })
                }
                if (req.body.answer) {
                    req.body.answer.forEach((answer_a) => {
                        QuestionAnswerA.create({
                            questionId: question.dataValues.id,
                            answerId: answer_a
                        })
                    })
                }
            })
            .then(question => res.status(201).send(question))
            .catch(error => res.status(400).send(error));
    },
    listIds(req, res) {
        return Question.findAll()
        .then((question) => {
            res.status(200).send(question);
        })
    },
    list(req, res) {
        Promise.all(models.map(function (Question) {
            return Question.findAll()
        }))
            .then(function (results) {
                var response = [];
                results[0].forEach(function (result, i) {
                    const question = result.dataValues;

                    const resultstype = results[1].map((d) => d.dataValues);
                    const type = resultstype.filter((r) => { return r.questionId === result.dataValues.id });
                    const types = type.map((b) => b.typeId);
                    question.type = types;

                    const resultscategory = results[2].map((d) => d.dataValues);
                    const category = resultscategory.filter((r) => { return r.questionId === result.dataValues.id });
                    const categories = category.map((b) => b.categoryId);
                    question.category = categories;

                    const resultsuser = results[3].map((d) => d.dataValues);
                    const user = resultsuser.filter((r) => { return r.questionId === result.dataValues.id });
                    const users = user.map((b) => b.userId);
                    question.user = users;

                    const resultsquestionlibraries = results[4].map((d) => d.dataValues);
                    console.log('resultsquestionlibraries', resultsquestionlibraries)
                    const questionlibrary = resultsquestionlibraries.filter((r) => { 
                        return parseInt(r.questionId) === result.dataValues.id
                    });
                    const questionlibraries = questionlibrary.map((b) => b.questionLibraryId);
                    question.questionlibrary = questionlibraries.map((q) => parseInt(q));

                    const resultsanswer = results[5].map((d) => d.dataValues);
                    const answer = resultsanswer.filter((r) => { return r.questionId === result.dataValues.id });
                    const answers = answer.map((b) => b.answerId);
                    question.answers = answers;

                    // const resultfamily = results[5].map((d) => d.dataValues);
                    // const child = resultfamily.filter((r) => { return r.questionParentId === result.dataValues.id });
                    // const children = child.map((b) => b.userId);
                    // question.children = children;

                    // // const resultchild = results[5].map((d) => d.dataValues);
                    // const parent = resultfamily.filter((r) => { return r.questionChildId === result.dataValues.id });
                    // const parents = parent.map((b) => b.userId);
                    // question.parents = parents;

                    response.push(question);
                });
                res.send(200, response)
            })
    },
    update(req, res) {
        return Question
            .find({ where: { id: req.params.id } })
            .then((question) => {
                if (!question) {
                    return res.status(400).send({
                        message: 'question not found',
                    });
                }
                return question
                    .update({        
                        description: req.body.description,
                        questiontext: req.body.questiontext,
                        active: req.body.active,
                        weight: req.body.weight
                    })
                    .then((question) => {
                        console.log(req.body)
                        // return UserRole
                        //     .findAll({ where: { questionId: question.id } })
                        //     .then((userroles) => {
                        //         return userroles.forEach((role) => {
                        //             role.destroy();
                        //         });

                        //     })
                        //     .then(() => {
                        //         if (req.body.roles) {
                        //             return req.body.roles.forEach((role) => {
                        //                 return UserRole
                        //                     .create({
                        //                         userId: req.params.id,
                        //                         roleId: role
                        //                     })
                        //             })
                        //         }
                        //     });
                    })
                res.status(200).send(question);
            })
            .catch(error => {
                console.log('the error', error)
                res.status(400).send(error)
            }
            );
    },
    remove(req, res) {
        return Question
            .find({ where: { id: req.params.id } })
            .then(question => {
                if (question) {
                    QuestionType.destroy({ where: { questionId: question.id } })
                        .then(QuestionCategory.destroy({ where: { questionId: question.id } }))
                        .then(QuestionUser.destroy({ where: { questionId: question.id } }))
                        .then(QuestionQuestionLibrary.destroy({ where: { questionlibraryId: question.id } }))
                        .then(question.destroy())
                        .catch(error => res.status(400).send(error))
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};