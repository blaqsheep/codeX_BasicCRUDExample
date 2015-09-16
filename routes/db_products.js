exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);

		var categoryQuery = "select id, name from Categories";
		var productsQuery = "select Products.id as ProductId, Products.name as ProductName, Categories.name as CategoryName from Categories inner join Products on Categories.id = Products.category_id";
		
		connection.query(categoryQuery, function(err, categories){
			if (err) return next(err);
			connection.query(productsQuery, [], function(err, products) {
				if (err) return next(err);
				res.render( 'db_products', {
					products : products,
					categories : categories
				});
			});
		});

	});
};

