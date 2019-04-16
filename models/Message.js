const Sequalize = require('sequelize')
const db = require('../config/database')

const Message = db.define('Message', {
    text: Sequalize.STRING
})

module.exports = Message