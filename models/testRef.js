const mongoose = require('mongoose')


const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Story'
        }
    ]
})

const storySchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
    title: String,
    fans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ]
})

const storyModel = mongoose.model('Story', storySchema)
const personModel = mongoose.model('Person', personSchema)

module.exports = {storyModel, personModel}