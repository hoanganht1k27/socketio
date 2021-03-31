const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
    username: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'user',
        required: true
    },
    private: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String,
        default: ''
    },
    likes: [
        {
            type: String
        }
    ],
    comments: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('media', mediaSchema)