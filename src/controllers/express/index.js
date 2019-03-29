var config = require('../../config');
var express = require('express');

var mainRoutes = express.Router();

mainRoutes.use('/api', require('./api'));

// mainRoutes.get('*', (req,res) =>{
//     res.sendFile(config.web_dir+'/build/index.html')
// })

mainRoutes.get('/', function(req, res) {
	res.send('Hello! The API is at http://' + config.host + ':' + config.port + '/api');
});

module.exports = mainRoutes;
