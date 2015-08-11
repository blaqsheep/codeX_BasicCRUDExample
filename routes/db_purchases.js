exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from Purchases', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'db_purchases', {
    			products : results
    		});
      });
	});
};