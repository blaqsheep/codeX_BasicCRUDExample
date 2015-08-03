var express = require('express');
//requiring express handlebars module 
var exphbs = require('express-handlebars');

var Products = require('./productsSold')
var products = new Products('./Nelisa Sales History.csv');

var app = express();
//rendering static files
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){ 
  res.render("index");
});


//this returns the product list
app.get("/products", function(req, res){

  //
  var listOfProducts = products.groupedItems();    
  var productList = [];
  for (key in listOfProducts){
    productList.push({
      name: key,
      qty: listOfProducts[key]
    });
  }//rendering product list to the server
  res.render('products', {products : productList});
});

//this returns the most popular product
app.get("/popular_product", function(req, res){

  var mostPopularProduct = products.mostPopular();
  res.render('popular_product', {product : mostPopularProduct});
});


//this returns the least popular product
app.get("/least_popular", function(req, res){
  var least_Popular = products.leastPopular();
  res.render('least_popular', {product: least_Popular});
});


//this returns category list
app.get("/categories", function(req, res){
  var listCategories = products.numberOfEachCategorySold();
  res.render('categories', {categories : listCategories});

});

//this returns most popular category
app.get("/most_popular_cat", function(req, res){
  var most_popular_cat = products.findMostAndLeastPopularCategories();
  res.render('most_popular_cat', most_popular_cat.mostPopularCat);
});

//This returns least popular category
app.get("/least_popular_cat", function(req, res){
  var least_popular_cat = products.findMostAndLeastPopularCategories();
  res.render('least_popular_cat', least_popular_cat.leastPopularCat);
});

//This returns sales history
app.get("/sales_history", function(req, res){
  
  var productList = products.productNames();
  res.render('sales_history',{products:productList});

});


//app.use(express.static('Images'));

// create a route
//app.get('/', function (req, res) {      
  // I can execute any code when someone is doing something in the browser...
 //res.send('Hello World!');
//});

//app.get('/', function(req, res){
//res.send("Most popular products")
//})
// new route
app.get('/hello', function (req, res){
res.send('Hello CodeX!');
});

//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});