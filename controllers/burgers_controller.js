/*
Create the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var app = express();

var models = require('../models');
var sequelizeConnection = models.sequelize;

app.get('/', function (req, res) {
	console.log('root access requested');
	res.redirect('/burgers');
});

app.get('/burgers', function (req, res) {
	console.log('burgers access requested');
	models.Burger.findAll({})
	.then(function(allBurgers){

		var burgerObject = { burgers: allBurgers};

		res.render('index', burgerObject);
  })
})


app.post('/burgers/create', function (req, res) {
	console.log('Create burger requested');
	models.Burger.create(
	{
		burger_name: req.body.newBurgerName,
		devoured: false
	})
	.then(function(allBurgers){
		res.redirect('/burgers');
	});
});

app.put('/burgers/update/:id', function (req, res) {
	console.log('Burger being devoured');
	var condition = req.params.id;
	
	//search for condition in id field
	models.Burger.findOne({ where: {id: condition} })
	.then(function(id) {

	//update devoured to true
	  id.updateAttributes({
      devoured: true
    })
    //reload page
    res.redirect('/burgers');
	})

});

module.exports = app;
