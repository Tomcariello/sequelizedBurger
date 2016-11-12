var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// and we bring in our models folder. This brings in the model's object, as defined in index.js
var models  = require('./models');
// extract our sequelize connection from the models object, to avoid confusion
var sequelizeConnection = models.sequelize;

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
// make our tables
.then(function(){
  // return sequelizeConnection.sync({force:true})
  console.log("Not resetting the database");
})

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var PORT = 3000;
// app.listen(port);
app.listen(process.env.PORT || PORT);
