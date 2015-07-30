select Products.id, Products.name, sales_csv.stock_item from Products join sales_csv on Products.name = sales_csv.stock_item;
