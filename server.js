const express = require('express')
const logger = require('morgan')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

const userRouter = require('./routes/user')

const dbString = 'mongodb://localhost:27017/socketio'
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbString, dbOptions)
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected")
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: 1000 * 60 * 60 * 24 // 1 day
    }
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/user', userRouter)

app.listen(process.env.PORT || 3000)