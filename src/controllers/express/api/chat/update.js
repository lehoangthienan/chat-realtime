var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Chat = require(config.models_dir + '/mongo/chat');

module.exports = (req, res)=>{
    let chat_id = req.params.chat_id
    Chat.findById(chat_id)
    .then(chat=>{
        if (!chat) {
            return Promise.reject("chat not exist")
        }

        Object.assign(chat, req.body.chat)

        return chat.save()
    })
    .then(chat=>{
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message))
}
