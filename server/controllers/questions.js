const Question = require('../models').Question;
// const User = require('../models').User;
// const Type = require('../models').Type;
// const Category = require('../models').Category;
const QuestionType = require('../models').question_type;
const QuestionCategory = require('../models').question_category;
const QuestionUser = require('../models').question_user;
var models = [Question, QuestionType, QuestionCategory, QuestionUser];

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
            })
            .then(question => res.status(201).send(question))
            .catch(error => res.status(400).send(error));
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
                        name: req.body.name,
                        active: req.body.active,
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phone1: req.body.phone1,
                        phone2: req.body.phone2,
                        preferredcontact: req.body.preferredcontact,
                        // role: req.body.roles
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
                        .then(
                        QuestionCategory.destroy({ where: { questionId: question.id } })
                        )
                        .then(
                        QuestionUser.destroy({ where: { questionId: question.id } })
                        )
                        .then(
                        question.destroy()
                        )
                        .catch(error => res.status(400).send(error))
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};