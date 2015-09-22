insert into Purchases(product_id, quantity,supplier_id, cost_price)
	
	select Products.id, stock_purchases_csv.quantity, Suppliers.id, stock_purchases_csv.cost 
	from  Products, stock_purchases_csv, Suppliers

	;