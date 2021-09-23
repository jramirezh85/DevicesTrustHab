const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express to serve end points
const app = express();

// load up node's built in file system helper library
const fs = require('fs');

// configure express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configurar cabecera y cors
app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// handle various routes from
const routes = require('./routes/routes.js')(app, fs);

// launch server
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});