const Question = require('../models').Question;
const QuestionType = require('../models').question_type;
const QuestionCategory = require('../models').question_category;
const QuestionQuestionLibrary = require('../models').question_questionlibrary;
const QuestionUser = require('../models').question_user;
const QuestionChild = require('../models').question_child;
const QuestionAnswer = require('../models').question_answer;
const QuestionAnswerC = require('../models').question_answer_c;
var models = [Question, QuestionType, QuestionCategory, QuestionUser, QuestionQuestionLibrary, QuestionAnswer, QuestionAnswerC];
var QuestionsByLibModels = [Question, QuestionQuestionLibrary];

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
                    req.body.answer.forEach((answer_c) => {
                        QuestionAnswerC.create({
                            questionId: question.dataValues.id,
                            answerId: answer_c
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
    listByLibs(req, res){
        console.log('req', req.body)
        Promise.all(QuestionsByLibModels.map((QuestionsByLibrary) => {
            return QuestionsByLibrary.findAll()
        }))
        .then((results) => {
            let questionList = results[1].filter((q)=>{
                return req.body.indexOf(parseInt(q.dataValues.questionLibraryId))!==-1;
            })
            let questionIds = questionList.map((q) => parseInt(q.dataValues.questionId));
            let questionsData = results[0].filter((q)=>{
                return questionIds.indexOf(parseInt(q.dataValues.id))!==-1;
            })
            let questions = questionsData.map((q)=>q.dataValues)
            res.status(200).send(questions);
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
                    // console.log('resultsquestionlibraries', resultsquestionlibraries)
                    const questionlibrary = resultsquestionlibraries.filter((r) => { 
                        return parseInt(r.questionId) === result.dataValues.id
                    });
                    const questionlibraries = questionlibrary.map((b) => b.questionLibraryId);
                    question.questionlibrary = questionlibraries.map((q) => parseInt(q));

                    const resultsanswer = results[5].map((d) => d.dataValues);
                    const answer = resultsanswer.filter((r) => { return r.questionId === result.dataValues.id });
                    const answers = answer.map((b) => b.answerId);
                    question.answers = answers;

                    const resultsanswerc = results[6].map((d) => d.dataValues);
                    // console.log('resultsanswerc', typeof parseInt(resultsanswerc[0].questionId));
                    // console.log('result', typeof result.dataValues.id);
                    const answerc = resultsanswerc.filter((r) => { 
                        return parseInt(r.questionId) === result.dataValues.id
                    });
                    const answersc = answerc.map((b) => parseInt(b.answerId));
                    question.answer = answersc;

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
                        return QuestionType
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questiontypes) => {
                                return questiontypes.forEach((questiontype) => {
                                    questiontype.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.type) {
                                    return req.body.type.forEach((type) => {
                                        return QuestionType
                                            .create({
                                                questionId: req.params.id,
                                                typeId: type
                                            })
                                    })
                                }
                            });
                    })
                    .then((question) => {
                        return QuestionCategory
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questioncategories) => {
                                return questioncategories.forEach((questioncategory) => {
                                    questioncategory.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.category) {
                                    return req.body.category.forEach((category) => {
                                        return QuestionCategory
                                            .create({
                                                questionId: req.params.id,
                                                categoryId: category
                                            })
                                    })
                                }
                            });
                    })
                    .then((question) => {
                        return QuestionQuestionLibrary
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questionquestionlibraries) => {
                                // console.log('questionquestionlibraries', questionquestionlibraries);
                                return questionquestionlibraries.forEach((questionquestionlibrary) => {
                                    console.log('questionquestionlibrary', questionquestionlibrary)
                                    questionquestionlibrary.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.questionlibrary) {
                                    return req.body.questionlibrary.forEach((questionlibrary) => {
                                        console.log('questionlibrary', questionlibrary);
                                        return QuestionQuestionLibrary
                                            .create({
                                                questionId: req.params.id,
                                                questionLibraryId: questionlibrary
                                            })
                                    })
                                }
                            });
                    })
                    .then((question) => {
                        return QuestionUser
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questionusers) => {
                                return questionusers.forEach((questionuser) => {
                                    questionuser.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.user) {
                                    return req.body.user.forEach((user) => {
                                        return QuestionUser
                                            .create({
                                                questionId: req.params.id,
                                                userId: user
                                            })
                                    })
                                }
                            });
                    })
                    .then((question) => {
                        return QuestionAnswer
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questionanswers) => {
                                return questionanswers.forEach((questionanswer) => {
                                    questionanswer.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.answers) {
                                    return req.body.answers.forEach((answer) => {
                                        return QuestionAnswer
                                            .create({
                                                questionId: req.params.id,
                                                answerId: answer
                                            })
                                    })
                                }
                            });
                    })
                    .then((question) => {
                        return QuestionAnswerC
                            .findAll({ where: { questionId: req.params.id } })
                            .then((questionanswers) => {
                                return questionanswers.forEach((questionanswer) => {
                                    questionanswer.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.answer) {
                                    console.log('req.body.answer', req.body.answer)
                                    return req.body.answer.forEach((answer) => {
                                        return QuestionAnswerC
                                            .create({
                                                questionId: req.params.id,
                                                answerId: answer
                                            })
                                    })
                                }
                            })
                            
                    })
        
            })
            .then((question)=>{
                console.log('response', question)
                return res.status(200).send(question);
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
                        .then(QuestionQuestionLibrary.destroy({ where: { questionId: question.id } }))
                        .then(QuestionAnswer.destroy({where: {questionId: question.id}}))
                        .then(QuestionAnswerC.destroy({where: {questionId: question.id}}))
                        .then(question.destroy())
                        .catch(error => res.status(400).send(error))
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};