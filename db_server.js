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
//var db_edit_products = require('./routes/db_edit_products')
var db_categories = require('./routes/db_categories');
var db_suppliers = require('./routes/db_suppliers');
var db_purchases = require('./routes/db_purchases');
var db_sales = require('./routes/db_sales');
var db_main = require('./routes/db_main');


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

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//setup the handlers
app.get('/', db_main.show);
app.get('/', db_products.show);
app.get('/products', db_products.show);
//this is to connect to the web form
app.get('/products/add', function(req, res){
	
	req.getConnection(function(err, connection){

		var categoryQuery = "select id, name from Categories";
			
			connection.query(categoryQuery, function(err, categories){
				if (err) return next(err);
				res.render('products_add', {categories : categories});		
			});

		});
	});

app.get('/products/delete/:id', function(req, res){
	var productId = req.params.id;

	req.getConnection(function(err, connection){

		connection.query("delete from Products where Id = ?", [productId], function(err, results){
			if (err)
				console.log(err);					
			res.redirect('/products');
		});
	});
});

app.get('/products/edit/:id', function(req, res){

	var categoryQuery = "select id, name from Categories";
	var productId = req.params.id;
	req.getConnection(function(err, connection){
		
		connection.query(categoryQuery, function(err, categories){
			if(err) return next(err);
			connection.query("select * from Products where Id = ?", [productId], function(err, results){

				var product = results[0];

				var categoryList = categories.map(function(category){
					return {
						id : category.id,
						name : category.name,
						selected : category.id === product.category_id
					}
				});

				res.render('product_edit', {
					categories : categoryList,
					product : product
				});


			});

		});
	});
});

app.post('/products/edit/:id', function(req, res){

	var categoryQuery = "select id, name from Categories";
	var id = req.params.id;
	var data = {
		category_id : req.body.categoryId, 
		name : req.body.product
	};
	
	req.getConnection(function(err, connection){
		connection.query("update Products set ? where id= ?", [data, id], function(err, results){
			if (err)
				console.log(err);
			
			res.redirect('/products');	
		});
	});

});


app.post('/products/add', function(req, res){
	//res.send(req.body.AddCategory)
			var data = {
					category_id : req.body.categoryId, 
					name : req.body.product
					  };
					req.getConnection(function(err, connection){
						connection.query("insert into Products set ?", data, function(err, results){
							if (err)
								console.log(err);					
							res.redirect('/products');	
						});
			
					});
			
				});


app.get('/categories', db_categories.show);
//rendering the add category handlebars(the web form)
app.get('/categories/add', function(req, res){
	res.render('category_add');
});

app.get('/categories/delete/:id', function(req, res){
	var categoryId = req.params.id;
			req.getConnection(function(err, connection){
				connection.query("delete from Categories where Id = ?", [categoryId], function(err, results){
					if (err)
						console.log(err);					
					res.redirect('/categories');
				});
			});
		});

app.post('/categories/add', function(req, res){
	//res.send(req.body.AddCategory)

			var data = { name : req.body.category};
			req.getConnection(function(err, connection){
				connection.query("insert into Categories set ?", data, function(err, results){
					if (err)
						console.log(err);
					
					res.redirect('/categories');	
				});
			});
			
		});

app.get('/categories/edit/:id', function(req, res){
	var categoryId = req.params.id;
	req.getConnection(function(err, connection){
		connection.query("select * from Categories where Id = ?", [categoryId], function(err, results){
			var category = results[0];
			//console.log(err);
			res.render('category_edit', {
				category : category
			});
		});
	});
});

app.post('/categories/edit/:id', function(req, res){

	var id = req.params.id;
	var data = { name : req.body.category};
	req.getConnection(function(err, connection){
		connection.query("update Categories set ? where Id = ?", [data, id], function(err, results){
			if (err)
				console.log(err);
			
			res.redirect('/categories');	
		});
	});

});

app.get('/suppliers', db_suppliers.show);

app.get('/suppliers/add', function(req, res){
	res.render('suppliers_add');
});

app.get('/suppliers/delete/:id', function(req, res){
	var supplierId = req.params.id;
			req.getConnection(function(err, connection){
				connection.query("delete from Suppliers where Id = ?", [supplierId], function(err, results){
					if (err)
						console.log(err);					
					res.redirect('/suppliers');
				});
			});
		});

app.post('/suppliers/add', function(req, res){
	var data = {name : req.body.supplier};

	req.getConnection(function(err, connection){
		connection.query("insert into Suppliers set ?", data, function(req, results){
			if(err)
				console.log(err);
			res.redirect('/suppliers');
		});
	});
});

app.get('/suppliers/edit/:id', function(req, res, next){
	var supplierId = req.params.id;
	// var data = { name : req.body.category};
	req.getConnection(function(err, connection){

		connection.query("select *  from Suppliers  where Id = ?", [supplierId], function(err, results){
			var supplier = results[0];		
			res.render('suppliers_edit',{
				supplier: supplier
			});

		});

	});



app.post('/suppliers/edit/:id', function(req, res){

		var id = req.params.id;
		var data = { name : req.body.supplier};
		req.getConnection(function(err, connection){
			connection.query("update Suppliers set ? where Id = ?", [data, id], function(err, results){
				if (err)
					console.log(err);
				
				res.redirect('/suppliers');	
			});
		});

	});

});


app.get('/purchases', db_purchases.show);

app.get('/purchases/add', function(req, res){
     
     req.getConnection(function(err, connection){

		var productsQuery = "select id, name from Products";
		var suppliersQuery = "select id, name from Suppliers";
			
			connection.query(productsQuery, function(err, products){
			connection.query(suppliersQuery, function(err, suppliers){
				if (err) return next(err);
				res.render('purchases_add', {products : products ,suppliers : suppliers});	
					
			});

		});
	});	
});

app.post('/purchases/add', function(req, res){

	console.log(req.body);

	var data = {
		supplier_id : req.body.supplier_id,
		product_id : req.body.product_id,
		quantity : req.body.quantity,
		cost_price : req.body.cost_price
	};

	req.getConnection(function(err, connection){
		connection.query("insert into Purchases set ?", data, function(req, results){
			if(err)
				console.log(err);
			res.redirect('/purchases'); 
		});
	});
});



app.get('/purchases/edit/:id', function(req, res){

	var productsQuery = "select id, name from Products";
	var suppliersQuery = "select id, name from Suppliers";
	var purchaseId = req.params.id;

	// console.log(purchaseId);
	// console.log(productsQuery);

		req.getConnection(function(err, connection){

			connection.query(productsQuery, function(err, products){

				connection.query(suppliersQuery, function(err, suppliers){
					if(err) return next(err);

					connection.query("select *  from Purchases  where Id = ?", [purchaseId], function(err, results){
						
						// console.log("**************************************************");
						// console.log("**************************************************");

						var purchase = results[0];

						var productList = products.map(function(product){
							return{
								id : product.id,
								name : product.name,
								selected : product.id === purchase.product_id
							}
						});

						// console.log(productList);

						var	supplierList = suppliers.map(function(supplier){
							return {
								id : supplier.id,
								name : supplier.name,
								selected : supplier.id === purchase.supplier_id
							}
						});

						res.render('purchases_edit', {

								products : productList,
								suppliers : supplierList,
								purchase : purchase
							});

						})					
					});
				});
			});
	});

app.post('/purchases/edit/:id', function(req, res){

	var productsQuery = "select id, name from Products";
	var suppliersQuery = "select id, name from Suppliers";

	var id = req.params.id;
	var data = { 
		quantity : req.body.quantity,
		cost_price : req.body.noSold,
		product_id :req.body.product_id,
		supplier_id : req.body.supplier_id
		// purchases : req.body.purchase

		};
console.log(req.body);
console.log("*******----++++++");
console.log(data)

	req.getConnection(function(err, connection){
		connection.query("update Purchases set ? where Id = ?", [data, id], function(err, results){
			if (err)
				console.log(err);
			
			res.redirect('/purchases');	
		});
	});

});

app.get('/purchases/delete/:id', function(req, res){
	var purchaseId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("delete from Purchases where Id = ?", [purchaseId], function(err, results){
			if(err)
				console.log(err);

				res.redirect('/purchases');
		});
	});
});

app.get('/Sales', db_sales.show);

app.get('/sales/add', function(req,res, next){

	req.getConnection(function(err, connection){
		var products = "select id, name from Products";
		var sales = "select no_sold, selling_price from Sales";

			connection.query(products, function(err, products){
				connection.query(sales, function(err, sales){
					if(err) return next(err);

					res.render('sales_add', {products : products, sales : sales});
				});
			});
	});

	app.post('/sales/add', function(req, res){
		var	data = {
			date : req.body.date,
			product_id : req.body.products_id,
			no_sold : req.body.no_sold,
			selling_price : req.body.selling_price
		}
		console.log(req.body);
		console.log(data);

		req.getConnection(function(err, connection){
			connection.query("insert into Sales set ?", data, function(err, results){
				if(err)
					console.log(err);

				res.redirect('/sales');
			});
		});
	});
});


// start the server
app.listen(8080, function (){
	console.log('Server started! At http://localhost: 8080');

});
