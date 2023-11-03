// Load the 'users' controller
var students = require('../../app/controllers/students.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
  // handle a get request made to /users path
  // and list users when /users link is selected
  app.get("/students", students.requiresLogin, students.list);
  app.post('/students/new', students.create);
  app.get("/students/:studentId/courses", students.listCoursesByStudent);
  //
  // Set up the 'users' parameterized routes 
	app.route('/students/:studentId')
    .get(students.read)
    .put(students.update)
    .delete(students.delete)
    // Set up the 'userId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('studentId', students.studentByID);
    //authenticate user
    app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);
};
