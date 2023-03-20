const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

server.listen(port,() => {
    console.log(`Server is running port ${port}`);
});

io.on('connection', (socket) => {
    console.log("Connected with a socket");
    socket.on('join',(data) => {
        //console.log("join........",data);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user connected');
    });
    socket.on('message',(data) => {
        //console.log("data........",data);
        io.in(data.room).emit('new message', {user:data.user, message:data.message})
    })
})
