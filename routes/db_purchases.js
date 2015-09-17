exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);

        var productsQuery = "select id, name from Products";
        var suppliersQuery = "select id, name from Suppliers";
		var Query = "select Products.name as ProductName, Suppliers.name as SupplierName, stock_purchases_csv.quantity as Quantity , stock_purchases_csv.total_cost as Total_Cost from stock_purchases_csv  inner join Products on stock_purchases_csv.item = Products.name inner join Suppliers on Suppliers.name = stock_purchases_csv.shop";


		connection.query(productsQuery, function(err, products) {
			if (err) return next(err);
		connection.query(suppliersQuery, function(err, suppliers) {
			// var query2 = "SELECT Id, name FROM Products";
        	if (err) return next(err);
        connection.query(Query, function(err, purchases){
        if (err) return next(err);

    		res.render( 'db_purchases', {
    			products : products,
    			suppliers : suppliers,
		    	purchases : purchases
		    		});
		        });
			});
	 	});

	});	
};