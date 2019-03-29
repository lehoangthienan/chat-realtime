var config = require('../../../config');
var Log = require(config.library_dir + '/log');
var Chat = require(config.models_dir + '/mongo/chat');
var response_socketio = require(config.library_dir+'/response').response_socketio;

module.exports = (io) => {
    const nsChat = 'chat';
    const chat = io.of('/'+nsChat);

    //middleware
    chat.use(require(config.library_dir+'/middleware').socketioMiddleware);

    chat.on("connection", function(socket){
        var decoded_token=socket.handshake.decoded_token;

        /**
         * to_id: receiverID
         * message
         */

        socket.on("newMessage", (data)=>{
            data.sender= decoded_token._id;
            Chat.create(data)
                .then(chat=>{
                    socket.broadcast.emit('newMessage', chat);
                })
                .catch(err=>response_socketio.exception(socket, nsChat, "newMessage", chat.receiver, err.message,err.message))

            Log.d('----------------EVENT new message----------------');
            Log.d("receive message", data);
        });

        socket.on("isSeen", (data)=>{
            data.sender= decoded_token._id;

            let chat_id = data.chat_id
            Chat.findById(chat_id)
            .then(chat=>{
                if (!chat) {
                    return Promise.reject("chat not exist")
                }

                Object.assign(chat, data.chat)

                return chat.save()
            })
            .then(chat=>{
                socket.broadcast.emit('isSeen', chat);
            })
            .catch(err=>response_socketio.exception(socket, nsChat, "isSeen", chat.receiver, err.message,err.message))

            Log.d('----------------EVENT isSeen----------------');
            Log.d("receive message", data);
        });
    });
}
