var config = require('../config');
var Log = require(config.library_dir + '/log');

var successObj = (result) => {
	return {
		'status':1,
		'result': result,
	}
}

var exceptionObj = (message, errorCode = 404) => {
	return {
		'status':0,
		'error': {
			'code': errorCode,
			'message': message,
		},
	}
}

var response_express = {
	success: (res, result) => {
		res.json(successObj(result));
	},

	exception: (res, message, errorCode) => {
		res.json(exceptionObj(message, errorCode));
	},
};

var response_socketio = {
	success: (socket, namespace, event, user_id, data)=>{
		socket.emit(event, data);
	},

	exception: (socket, namespace, event, user_id, message, errorCode)=>{
		socket.emit(event, errorCode);
	}
};

module.exports={successObj, exceptionObj, response_express}
