const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)

const room = 'main'
io.on('connection', (socket) => {
    console.log('Connectd')
    socket.on('send-message', (value) => {
        console.log(value)
        io.in(room).emit('receive-message', value)
    })
    
    socket.on('join', (value) => {
        socket.join(room)
        io.in(room).emit('joined', value)
        console.log(`${value.userName} joined`)
    })
    
    socket.on('leave', (value) => {
        io.in(room).emit('leaved', value)
        socket.leave(room)
        console.log(`${value.userName} leaved`)
    })

    socket.on('typing', (value) => {
        console.log(`${value.userName} typing.....`)
        io.in(room).emit('member_typing', {
            userName: value.userName
        })
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected.')
    })
})
app.get('/', (req, res) => {
    res.send('Hello World')
})
server.listen(port, () => {
    console.log(`Server started with port ${port}`)
})
