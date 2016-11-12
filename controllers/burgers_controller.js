/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
// var router = express.Router();
var app = express();
// var burger = require('../models/burger.js');

var models = require('../models');
var sequelizeConnection = models.sequelize;

// TODO: Sync our models
// models.sequelize.sync({force: true})
// console.log(models);

app.get('/', function (req, res) {
	console.log('root access requested');
	res.redirect('/burgers');
});

app.get('/burgers', function (req, res) {
	models.Burger.findAll({})
	.then(function(response){
		console.log("********************");
		console.log("Returning data from database");
		console.log("********************");
		console.log(response);
  	res.render('index', response );
  })
})


app.post('/burgers/create', function (req, res) {
	// burger.create([req.body.newBurgerName], function () {
	// 	res.redirect('/burgers');
	// });
});

app.put('/burgers/update/:id', function (req, res) {
	// var condition = req.params.id;

	// console.log('condition ', condition);

	// burger.update(req.params.id, function () {
	// 	res.redirect('/burgers');
	// });
});

module.exports = app;
