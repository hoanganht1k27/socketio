const { resolveInclude } = require('ejs')
const express = require('express')
const router = express.Router()

const {storyModel, personModel} = require('../models/testRef')
const { route } = require('./media')

router.get('/', async (req, res) => {
    const author = new personModel({
        name: "Anh Nguyen",
        age: 19
    })
    author.save(function(err) {
        if(err) return res.send(err)
        const story1 = new storyModel({
            title: 'Cau chuyen 1',
            author: author._id
        })

        story1.save(function(err) {
            if(err) return res.send(err)
            res.send("That\'s it")
        })
    })
})

router.get('/addFan', async (req, res) => {
    const author = new personModel({
        name: "Anh Nguyen 2",
        age: 20
    })

    author.save(function(err) {
        if(err) return res.send(err)
        storyModel.findOne({title: 'Cau chuyen 1'}, function(err, story) {
            if(err) return res.send(err)
            story.fans.push(author._id)
            story.save(function(err) {
                if(err) return res.send(err)
                res.send("OK")
            })
        })
    })
})

router.get('/populate', async (req, res) => {
    storyModel.findOne({title: 'Cau chuyen 1'})
            .populate('fans')
            .exec(function(err, story) {
                if(err) return res.send(err)
                console.log(story.fans)
                res.json(story.fans)
            })
})

module.exports = router