var config = require('../../../../config');
var express = require('express');
var chatRoutes = express.Router();

chatRoutes.post("/", require('./create'))
chatRoutes.delete("/:chat_id", require('./delete'))
chatRoutes.put("/:chat_id", require('./update'))

let find = require('./find')
chatRoutes.get("/:chat_id", find.byID)
chatRoutes.get("/", find.findAll)
chatRoutes.get("/sender/:user_id", find.findBySender)
chatRoutes.get("/receiver/:user_id", find.findByReceiver)

module.exports = chatRoutes;
