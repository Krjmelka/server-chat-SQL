const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
//------Routes--------
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')

//-----Database-------
const db = require('./config/database')
const User = require('./models/User')
const Message = require('./models/Message')
const Chatroom = require('./models/Chatroom')

db.sync()

User.hasMany(Message)
Message.belongsTo(User)

Chatroom.hasMany(Message)
Message.belongsTo(Chatroom)


const users = [{ id: 1, username: 'hello', password: 'test', firstName: 'Test', lastName: 'User' }];
db.authenticate()
.then(() => {
  console.log('Database connected');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//--------------------

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/user', userRoutes);
app.use('/message', messageRoutes);



const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Listening on port ${PORT}`))
