
select Products.name as ProductName, Suppliers.name as SupplierName from stock_purchases_csv 
	inner join Products on stock_purchases_csv.item = Products.name
	inner join Suppliers on Suppliers.name = stock_purchases_csv.shop;