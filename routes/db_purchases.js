exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);

        var productsQuery = "select id, name from Products";
        var suppliersQuery = "select id, name from Suppliers";
		var Query = "select Products.name as ProductName, Suppliers.name as SupplierName, Purchases.quantity as Quantity , Purchases.cost_price as Total_Cost from  Purchases  inner join Products on Purchases.product_id = Products.id inner join Suppliers on Suppliers.id = Purchases.supplier_id";

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