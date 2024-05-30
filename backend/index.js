const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id)

    socket.on('new-joined', (room) => {
        console.log(`User joined room: ${room}`)
        socket.join(room)
    })

    socket.on('new-message', (message, room) => {
        console.log(`Message received in room ${room}: ${message}`)
        socket.to(room).emit('receive-message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id)
    })
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
