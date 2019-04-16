const Sequalize = require('sequelize')
const db = require('../config/database')
const encryptPassword = require('../helpers/encryptPassword')

const User = db.define('User', {
    user: {
        type: Sequalize.STRING(32),
        unique: true
    },
    password: {
        type: Sequalize.STRING,
        set(pw) {this.setDataValue("password",encryptPassword(pw))}
    },
    email: {
        type: Sequalize.STRING(32),
        unique: true
    }
})


module.exports = User