const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const userModel = require('../models/user')

const saltRounds = 10;
const privateKey = 'anhnguyendeptrai'

router.get('/', checkUserNotLogin, (req, res) => {
    res.send("Hello")
})

router.get('/login', checkUserLogin, (req, res) => {
    res.render('users/login')
})

function checkNull(x) {
    return (x != null && x != undefined && x != '')
}

function checkUserLogin(req, res, next) {
    if(checkNull(req.session.token) && checkNull(req.session.username)) {
        let decoded = jwt.verify(req.session.token, privateKey)
        if(decoded.username === req.session.username) return res.redirect('/user')
    }
    next()
}

function checkUserNotLogin(req, res, next) {
    if(checkNull(req.session.token) && checkNull(req.session.username)) {
        let decoded = jwt.verify(req.session.token, privateKey)
        if(decoded.username === req.session.username) return next()
    }

    return res.redirect('/user/login')
}

router.post('/login', async (req, res) => {
    try {
        let {username, password} = req.body
        let u = await userModel.findOne({username: username})
        if(u === null) {
            res.send({message: "Username khong ton tai"})
        }
        if(await bcrypt.compare(password, u.password)) {
            let ob = {username: u.username, fullname: u.fullname}
            let token = jwt.sign(ob, privateKey);
            req.session.token = token
            req.session.username = username
            res.redirect('/user')          
        } else {
            res.send({message: "Mat khau sai"})
        }
    } catch (err) {
        res.send(err)
    }    
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res) => {
    try {
        let {username, fullname, password, cfpassword} = req.body
        if(password != cfpassword) {
            throw Error("Password not match")
        }
        password = await bcrypt.hash(password, saltRounds)
        let u = new userModel({
            username: username, 
            fullname: fullname,
            password: password
        })
        let result = await u.save()
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router