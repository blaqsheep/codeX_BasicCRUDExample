exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
				var query = "select Products.name as ProductName, Categories.name as CategoryName from Categories inner join Products on Categories.id = Products.category_id";
				connection.query(query, [], function(err, results) {
        			if (err) return next(err);
    				res.render( 'db_products', {
    					products : results
    		});
      });
	});
};

