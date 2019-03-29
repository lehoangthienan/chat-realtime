var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var lib_common = require(config.library_dir+'/common');
var Chat = require(config.models_dir + '/mongo/chat');

module.exports = (req, res)=>{
    Chat.create(req.body.chat)
    .then(chat=>{
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message))
}