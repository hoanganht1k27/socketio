const express = require('express')
const logger = require('morgan')
const app = express()
const path = require('path')

const server = require('http').createServer(app)

const io = require('socket.io')(server)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

//Tạo socket 
io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    socket.on('send', function (data) {
        console.log(data)
        io.sockets.emit('sendBack', {name: "Ahihi do ngoc"});
    });
});

server.listen(process.env.PORT || 3000)