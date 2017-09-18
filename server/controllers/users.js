const User = require('../models').User;
const UserRole = require('../models').user_role;
// const Role = require('../models').Role;
let UsersList = [];
var models = [User, UserRole];

module.exports = {
    create(req, res) {
        return User
            .create({
                // title: req.body.title,
                name: req.body.name,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone1: req.body.phone1,
                phone2: req.body.phone2,
                preferredcontact: req.body.preferredcontact,
                active: req.body.active,
            })
            .then((user) => {
                if (req.body.roles) {
                    console.log('user', user.dataValues.id)
                    req.body.roles.forEach((role) => {
                        console.log('role', role)
                        UserRole.create({
                            userId: user.dataValues.id,
                            roleId: role
                        })
                    })
                }
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        Promise.all(models.map(function (User) {
            return User.findAll()
        }))
            .then(function (results) {
                var response = [];
                results[0].forEach(function (result, i) {
                    const user = result.dataValues;
                    const resultsdata = results[1].map((d) => d.dataValues);
                    const role = resultsdata.filter((r) => { return r.userId === result.dataValues.id });
                    const roles = role.map((b) => b.roleId);
                    user.roles = roles;
                    response.push(user);
                })
                res.send(200, response)
            })
    },
    update(req, res) {
        return User
            .find({ where: { id: req.params.id } })
            .then((user) => {
                if (!user) {
                    return res.status(400).send({
                        message: 'user not found',
                    });
                }
                return user
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
                    .then((user) => {
                        console.log(req.body)
                        return UserRole
                            .findAll({ where: { userId: user.id } })
                            .then((userroles) => {
                                return userroles.forEach((role) => {
                                    role.destroy();
                                });

                            })
                            .then(() => {
                                if (req.body.roles) {
                                    return req.body.roles.forEach((role) => {
                                        return UserRole
                                            .create({
                                                userId: req.params.id,
                                                roleId: role
                                            })
                                    })
                                }
                            });
                    })
                res.status(200).send(user);
            })
            .catch(error => {
                console.log('the error', error)
                res.status(400).send(error)
            }
            );
    },
    remove(req, res) {
        return User
            .find({ where: { id: req.params.id } })
            .then(user => {
                if (user) {
                    UserRole.destroy({ where: { userId: user.id } })
                        .then(user.destroy())
                        .catch(error => res.status(400).send(error))
                }
            })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
};