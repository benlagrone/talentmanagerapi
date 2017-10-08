const answersController = require('../controllers').answers;
const assessmentsController = require('../controllers').assessments;
const categoriesController = require('../controllers').categories;
const groupsController = require('../controllers').groups;
const questionlibrariesController = require('../controllers').questionlibraries;
const questionsController = require('../controllers').questions;
const rolesController = require('../controllers').roles;
const typesController = require('../controllers').types;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/answers', answersController.create);
  app.post('/api/assessments', assessmentsController.create);
  app.post('/api/categories', categoriesController.create);
  app.post('/api/groups', groupsController.create);
  app.post('/api/questionlibraries', questionlibrariesController.create);
  app.post('/api/questions', questionsController.create);
  app.post('/api/roles', rolesController.create);
  app.post('/api/types', typesController.create);
  app.post('/api/users', usersController.create);

  app.get('/api/answers', answersController.list);
  app.get('/api/assessments', assessmentsController.list);
  app.get('/api/categories', categoriesController.list);
  app.get('/api/groups', groupsController.list);
  app.get('/api/questionlibraries', questionlibrariesController.list);
  app.get('/api/questions', questionsController.list);
  app.get('/api/questionids', questionsController.listIds);
  app.get('/api/roles', rolesController.list);
  app.get('/api/types', typesController.list);
  app.get('/api/users', usersController.list);

  app.put('/api/answers/:id', answersController.update);
  app.put('/api/assessments/:id', assessmentsController.update);
  app.put('/api/categories/:id', categoriesController.update);
  app.put('/api/groups/:id', groupsController.update);
  app.put('/api/questionlibraries/:id', questionlibrariesController.update);
  app.put('/api/questions/:id', questionsController.update);
  app.put('/api/roles/:id', rolesController.update);
  app.put('/api/types', typesController.update);
  app.put('/api/users/:id', usersController.update);

  app.delete('/api/answers/:id', answersController.remove);
  app.delete('/api/assessments/:id', assessmentsController.remove);
  app.delete('/api/categories/:id', categoriesController.remove);
  app.delete('/api/groups/:id', groupsController.remove);
  app.delete('/api/questionlibraries/:id', questionlibrariesController.remove);
  app.delete('/api/questions/:id', questionsController.remove);
  app.delete('/api/roles/:id', rolesController.remove);
  app.delete('/api/types', typesController.remove);
  app.delete('/api/users/:id', usersController.remove);

  app.post('/api/questions/listByLibs', questionsController.listByLibs);
  app.post('/api/answers/answersbyquestions', answersController.listByQuestionIds);
};