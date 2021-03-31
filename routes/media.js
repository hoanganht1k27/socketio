const express = require('express')
const router = express.Router()

const {checkNull} = require('./util')

const mediaModel = require('../models/media')
const { response } = require('express')

router.get('/', async (req, res) => {
    try {
        let username = req.session.username
        let result = await mediaModel.find({username: username})
        res.json(result)
    } catch (err) {
        res.send(err)
    }
})


router.get('/add', (req, res) => {
    res.render('media/add.ejs')
})

router.post('/add', async (req, res) => {
    try {
        let username = req.session.username
        console.log(username)
        let {createdAt, post, private} = req.body
        private = (private == "0" ? false : true)
        let p = new mediaModel({
            username: username,
            createdAt: new Date(createdAt),
            content: post,
            private: private
        })
        let result = await p.save()
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})

router.get('/sua/:postId', async (req, res) => {
    let postId = req.params.postId
    try {
        let post = await mediaModel.findOne({_id: postId})
        if(post == null) {
            res.send("Post can sua khong ton tai")
        } else {
            res.render('media/sua.ejs', {
                postId: postId,
                content: post.content,
                createdAt: post.createdAt,
                private: post.private
            })
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/sua/:postId', async (req, res) => {
    let postId = req.params.postId
    try {
        let post = await mediaModel.findOne({_id: postId})
        if(post == null) {
            res.send("Post can sua khong ton tai")
        } else {
            let content = req.body.post
            let {createdAt, private} = req.body
            private = (private == '0' ? false: true)
            post.content = content
            post.private = private
            post.createdAt = createdAt
            let result = await post.save()
            res.send(result)
        }
    } catch (err) {
        res.send(err)
    }
})

router.get('/xoa/:postId', async (req, res) => {
    let postId = req.params.postId
    try {
        let post = await mediaModel.findOne({_id: postId})
        if(post == null) {
            res.send("Post can xoa khong ton tai")
        } else {
            res.render('media/xoa.ejs', {
                postId: postId,
                content: post.content,
                createdAt: post.createdAt,
                private: post.private
            })
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/xoa/:postId', async (req, res) => {
    let postId = req.params.postId
    try {
        let result = await mediaModel.deleteOne({_id: postId})
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router