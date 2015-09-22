exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);

		var purchases = "select Products.name as ProductName, Suppliers.name as SupplierName, Purchases.id, Purchases.quantity as Quantity , Purchases.cost_price as Total_Cost from  Purchases  inner join Products on Purchases.product_id = Products.id inner join Suppliers on Suppliers.id = Purchases.supplier_id";

        connection.query(purchases, function(err, purchases){
        if (err) return next(err);

    		res.render( 'db_purchases', {
		    	purchases : purchases
		    		});
		        });
			});
	 	};