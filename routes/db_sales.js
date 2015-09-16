exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
				connection.query("select date_format(Sales.date, '%e %M %Y') as Date, Products.name as ProductName, Categories.name as CategoryName, Sales.no_sold as SoldNumber, Sales.selling_price as SellingPrice from Sales, Categories inner join Products on Categories.id = Products.category_id", [], function(err, results) {
		        	if (err) return next(err);

		    		res.render( 'db_sales', {
		    			products : results
		    		});
		      });
			});
		};
