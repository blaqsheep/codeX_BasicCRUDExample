exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		var query = "select distinct stock_purchases_csv.shop as SupplierName, Products.name as ProductName, Categories.name as CategoryName, stock_purchases_csv.quantity as Quantity from stock_purchases_csv, Products inner join Categories on Categories.id = Products.category_id";
		connection.query(query, [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'db_suppliers', {
    			products : results
    		});
      });
	});
};