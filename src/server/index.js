var express = require('express');
var app = express();
var helmet = require('helmet');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http').Server(app);
var config = require('../config');
var cors = require('cors');
var io = require('socket.io')(http, {
	pingInterval: 30000,
	pingTimeout: 30000,
});

const start = () => {
	return new Promise((resolve, reject)=>{
		app.use(helmet());
		app.use(cors());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json({limit: '50mb', type: ['application/json', 'text/plain']}));
		app.use(express.static(config.web_dir+"/build"));
		app.use((err, req, res, next) => {
			reject(new Error('Something went wrong!, err:' + err))
			res.status(500).send('Something went wrong!')
		})
		app.use(function(req, res, next){
			req.body=JSON.parse(JSON.stringify(req.body));
			req.query=JSON.parse(JSON.stringify(req.query));
			next();
		});

		app.use('/', require(config.controllers_dir+'/express'));
		app.get('*', (req, res) => {
			res.sendFile(path.join(config.web_dir+"/build/index.html"));
		})
		
		//socket
		io.use(require(config.library_dir+'/middleware').socketioMiddleware);
		io.on('connection', (socket) => {
			console.log(socket.handshake.decoded_token._id + ' has connected (socket_id: ' + socket.id + ')');

			// TODO: socket.handshake.query.token: check token valid, set online

			socket.on("disconnect", ()=>{
				console.log(socket.handshake.decoded_token._id + ' has disconnected (socket_id: ' + socket.id + ')');

				// TODO: set offline
			})
		});

		require(config.controllers_dir+'/socketio/chat')(io);

		const server = http.listen(process.env.PORT || config.port, config.host, ()=>resolve(server));
	});
}

module.exports = {start};