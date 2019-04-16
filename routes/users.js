const express = require('express');
const router = express.Router();
const User = require('../models/User')
const encryptPassword = require('../helpers/encryptPassword')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res, next) => {
    const user = req.body
    let findUser = await User.findOne({where: {user: user.username}})
    let findEmail = await User.findOne({where: {email: user.email}})
    
    if (findUser){
        return res.status(409).json({
            message: "Name is exist"
        })
    }
    else if(findEmail){
        return res.status(409).json({
            message: "Email is exist"
        })
    }
    else {
        try{
            await User.create({
                user: user.username, 
                password: user.password,
                email: user.email
            })
            res.status(201).json({
                message: "User created"
            })
        }
        catch (err){
            console.log("error");
            res.status(500).json({
                message: "Some error",
                error: err
            })
        }
    }   
})

router.post('/login', async (req, res, next) => {
    const user = req.body
    let finduser = await User.findOne({where: {user: user.username}})
    if (!finduser || encryptPassword(user.password) !== finduser.password){
        return res.status(401).json({
            message: "Auth failed"
        })
    } else {
        const token = jwt.sign({
            username: finduser.user,
            userId: finduser.id
        },"superTopSecret")
        res.status(200).json({
            message: "Successful",
            token
        })
    }
    
})

module.exports = router;