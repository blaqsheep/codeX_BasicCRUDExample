// defines that javascript code be  executed in strict mode
'use strict';

// grab the packages we need
var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var db_products = require('./routes/db_products');
var db_categories = require('./routes/db_categories');
var db_suppliers = require('./routes/db_suppliers');
var db_purchases = require('./routes/db_purchases');

var app = express();



var dbOptions = {
				host:'localhost',
				user: 'root',
				password: 'Nondlozio89',
				database: 'Nelisa_Spaza',
				port: 3306
				};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');





//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//setup the handlers
app.get('/', db_products.show);
app.get('/Products', db_products.show);
app.get('/Products/edit/:id', db_products.get);
app.post('/Products/update/:id', db_products.update);
app.post('/Products/add', db_products.add);
app.get('/Products/delete/:id', db_products.delete);

app.get('/Categories', db_categories.show);

app.get('/Suppliers', db_suppliers.show);

app.get('/Purchases', db_purchases.show);

// routes will go here








//returns categories from the database
/*app.get('/categories', function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		
		connection.query('SELECT * from Categories', [], function(err, results) {
        	if (err) return next(err);

    		res.send(results);
      	});
	});
});
*/

// start the server
app.listen(8080, function (){
	console.log('Server started! At http://localhost: 8080');

});
