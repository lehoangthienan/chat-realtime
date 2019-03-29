var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Chat = require(config.models_dir + '/mongo/chat');

exports.byID = (req, res)=>{
    let chat_id = req.params.chat_id
    Chat.findOne({_id: chat_id})
    .then(chat=>{
        if (!chat) {
            return Promise.reject("chat not exist")
        }
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findAll = (req, res)=>{
    Chat.find({})
    .then(chats=>response_express.success(res, chats))
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findBySender = (req, res)=>{
    let user_id = req.params.user_id
    Chat.find({sender: user_id})
    .populate('sender')
    .then(chat=>{
        if (!chat) {
            return Promise.reject("chat not exist")
        }
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message))
}

exports.findByReceiver = (req, res)=>{
    let user_id = req.params.user_id
    Chat.find({receiver: user_id})
    .populate('receiver')
    .then(chat=>{
        if (!chat) {
            return Promise.reject("chat not exist")
        }
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message))
}