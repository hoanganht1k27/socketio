const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        default: 0
    }
})

module.exports = mongoose.model('user', userSchema)