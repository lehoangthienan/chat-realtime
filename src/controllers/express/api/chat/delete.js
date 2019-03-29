var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Chat = require(config.models_dir + '/mongo/chat');

module.exports = (req, res)=>{
    let chat_id = req.params.chat_id
    Chat.deleteOne({_id: chat_id})
    .then(()=>{
        response_express.success(res)
    })
    .catch(err=>response_express.exception(res, err.message))
}