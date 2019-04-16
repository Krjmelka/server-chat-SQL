const Sequalize = require('sequelize')
const db = require('../config/database')

const Chatroom = db.define('Chatroom', {
    chatroom: Sequalize.STRING
})

const chatRooms = ["Redux", "React", "Node", "Docker-Fans"]
chatRooms.map((item) => Chatroom.create({chatroom: item}))

module.exports = Chatroom

