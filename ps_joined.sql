
select Products.name as ProductName, Suppliers.name as SupplierName, stock_purchases_csv.quantity as Quantity , stock_purchases_csv.total_cost as Total_Cost from stock_purchases_csv 
	inner join Products on stock_purchases_csv.item = Products.name
	inner join Suppliers on Suppliers.name = stock_purchases_csv.shop;