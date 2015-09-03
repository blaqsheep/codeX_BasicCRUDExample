exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
    		res.render( 'db_main')
    	});
      };
