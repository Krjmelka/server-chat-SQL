const express = require('express');
const router = express.Router();
const Message = require('../models/Message')
const Users = require('../models/User')

router.post('/post', async (req, res, next) => {
    const message = req.body
    try{    
        await Message.create({
            text: message.text,
            UserId: message.userId,
            ChatroomId: message.chatroomId
        })

        res.status(200).json({
            message: "Post Created"
        })
    }
    catch(err){
        res.status(500).json({
            message: "Failed",
            error: err
        })
    }
})

router.get('/get/:chatroomId', async (req, res, next) => {
    console.log(req.params.chatroomId);
    const messages = await Message.findAll({where: {ChatroomId: req.params.chatroomId}, include: [{model: Users, attributes: ["user"]}]})
    let filteredMessages = messages.map((item)=> ({
        text: item.text,
        chatroomID: item.ChatroomId,
        username: item.User.user,
        date: item.createdAt
    }))
    res.send(filteredMessages)
})

module.exports = router;