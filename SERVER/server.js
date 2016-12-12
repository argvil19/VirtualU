	//Creates express http server at 127.0.0.1
	var express = require('express'),
	    app = express(), //Creates express http server at 127.0.0.1
	    bodyParser = require('body-parser'), //Parse response body for json data
	    logger = require('morgan'), //morgan server activity logger
	    routes = require('./routes/index'), //route to our routes javascript file
	    http = require('http');
	var port = process.env.PORT || 3000;

	app.use(logger('dev')); //Dev logger
	app.use(bodyParser.json({ limit: '50mb' })); //mongodb upload size limit
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	app.use('/routes', express.static(__dirname + '/routes'));
	app.use(express.static(__dirname + '/../VIEWS')); //View for students/admins
	app.use('/', routes); //Handle all requests though our router.


	if (!module.parent) {
	    http.createServer(app).listen(port, function() {
	        console.log("Server listening on port 3000");
	    });
	}

	module.exports = app;
